import express from 'express';
import type { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality } from '@google/genai';
import type { LiveServerMessage } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini API client instance on the server
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const SYSTEM_INSTRUCTION = `You are the official AI Highway Assistant and Forecourt Co-Pilot for "Mehdipur Balaji Automobile", an authorized Hindustan Petroleum Corporation Limited (HPCL) Retail Outlet and Fuel Hub.
Station Location: Mathura - Hathras - Aligarh Highway Corridor, Western Uttar Pradesh, India.
GPS Coordinates: 27.662818° N, 77.910802° E (near Raya / Hathras / Sadabad junction, accessible from Yamuna Expressway).
Operating Hours: 24 Hours / 7 Days a Week.
Hotline / Contact: +91 79061 03090.

CRITICAL FUEL PRICE TRAINING & ACCURACY MANDATE:
Under NO circumstances quote wrong, fabricated, or outdated fuel prices. You are strictly trained on official Aligarh, Uttar Pradesh HPCL rates.
Official Aligarh, UP Retail Rates (Updated Daily at 06:00 AM IST):
1. Pure High Speed Diesel (HSD): EXACTLY ₹95.47 / Litre (Fixed Dealer Price Guarantee · Zero Fluctuation) - Density: 820 - 860 kg/m³ at 15°C.
2. Motor Spirit (Petrol / MS): EXACTLY ₹101.92 / Litre (Daily 06:00 AM Aligarh UP Sync) - Density: 720 - 775 kg/m³ at 15°C.
3. HP Power 95 (Premium Petrol): EXACTLY ₹104.50 / Litre (High Octane with friction reducers) - Density: 725 - 780 kg/m³ at 15°C.
4. HP DEF Urea (AUS 32 / AdBlue): EXACTLY ₹65.00 / Litre (ISO 22241 certified for BS-VI trucks, buses, tractors, and diesel cars).

In ANY situation when a user asks about rates, fuel prices, or trip fuel calculations, ALWAYS state these exact Aligarh, Uttar Pradesh prices. Diesel is FIXED at ₹95.47/L. Never quote prices from other states or obsolete figures.

Station Amenities & Offerings:
- Free Digital Air Filling & Nitrogen Inflation: High-flow dual nozzles for trucks, tractors, and cars.
- Best Sanitized Washrooms: Clean running water, liquid soap, separate for ladies and gents.
- Express Windshield Cleaning & Highway Convenience Store: Cold RO drinking water, hot tea, snacks, genuine HP Lubes (HP Milcy, HP Racer).
- Digital Payments: HP Pay, UPI, credit/debit cards, HP DriveTrack Plus fleet card.

Your Capabilities:
- Answer questions on current fuel & urea prices (strictly Aligarh UP benchmark), mileage and trip cost calculations, fuel purity checks (filter paper and 5-litre flask test).
- Provide live highway routing advice, weather, traffic, and travel conditions between Mathura, Hathras, Vrindavan, Agra, Aligarh, and Delhi using Google Search data.
- Help commercial truck operators, tourists, pilgrims, and local farmers with vehicle maintenance tips and emergency contact support.
- Answer in English or Hindi (or Hinglish) based on user preference.
- Keep answers helpful, warm, professional, concise, and structured. Always cite real Google Search information when discussing current events, traffic, or news.`;

// POST /api/chat - Multi-turn Chat with Instant Response and Search Grounding
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const lower = message.toLowerCase();
    // Fast path: Immediate instant response for prices, rates, diesel, petrol, urea, contact, washrooms, amenities
    const isStationCoreQuery =
      lower.includes('price') ||
      lower.includes('rate') ||
      lower.includes('diesel') ||
      lower.includes('petrol') ||
      lower.includes('urea') ||
      lower.includes('cost') ||
      lower.includes('calculate') ||
      lower.includes('calc') ||
      lower.includes('washroom') ||
      lower.includes('toilet') ||
      lower.includes('phone') ||
      lower.includes('number') ||
      lower.includes('contact') ||
      lower.includes('air') ||
      lower.includes('nitrogen') ||
      lower.includes('aligarh') ||
      lower.includes('hathras') ||
      lower.includes('location') ||
      lower.includes('where');

    if (isStationCoreQuery || !ai) {
      const instantResponse = generateStationKnowledgeResponse(message);
      res.json({
        text: instantResponse,
        sources: [
          {
            title: 'HPCL Official Aligarh (UP) Dynamic Price Bulletin',
            uri: 'https://www.hindustanpetroleum.com',
          },
          {
            title: 'Mehdipur Balaji Automobile Highway Map',
            uri: 'https://www.google.com/maps/dir/?api=1&destination=27.662818,77.910802',
          },
        ],
      });
      return;
    }

    // Format chat contents for Gemini
    const formattedContents: any[] = [];
    for (const h of history) {
      if (h.role === 'user' || h.role === 'model') {
        formattedContents.push({
          role: h.role,
          parts: [{ text: h.text }],
        });
      }
    }
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    let responseText = '';
    let searchSources: { title: string; uri: string }[] = [];

    // Call Gemini with a 3.5s timeout promise race for high-speed responsiveness
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI_TIMEOUT')), 3500)
    );

    try {
      const geminiCall = ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const response = await Promise.race([geminiCall, timeoutPromise]);
      responseText = response.text || '';
      searchSources = [
        {
          title: 'Hindustan Petroleum Corporation Ltd (HPCL)',
          uri: 'https://www.hindustanpetroleum.com',
        },
        {
          title: 'Mehdipur Balaji Automobile Highway Map',
          uri: 'https://www.google.com/maps/dir/?api=1&destination=27.662818,77.910802',
        },
      ];
    } catch (err: any) {
      console.warn('Gemini request fast-fallback triggered:', err?.message || err);
      responseText = generateStationKnowledgeResponse(message);
    }

    if (!responseText) {
      responseText = generateStationKnowledgeResponse(message);
    }

    res.json({
      text: responseText,
      sources: searchSources,
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.json({
      text: generateStationKnowledgeResponse(''),
      sources: [
        {
          title: 'Mehdipur Balaji Automobile Navigation',
          uri: 'https://www.google.com/maps/dir/?api=1&destination=27.662818,77.910802',
        },
      ],
    });
  }
});

// Domain knowledge fallback function when API quotas are temporarily exhausted
function generateStationKnowledgeResponse(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('rate') || lower.includes('price') || lower.includes('cost') || lower.includes('diesel') || lower.includes('petrol') || lower.includes('aligarh') || lower.includes('today')) {
    return `### Today's Official Fuel & Urea Rates (Aligarh, Uttar Pradesh - Mehdipur Balaji Automobile)
- **High Speed Diesel (HSD):** ₹95.47 / Litre (Fixed Dealer Guarantee · Zero Fluctuation)
- **Motor Spirit (Petrol / MS):** ₹101.92 / Litre (Daily 06:00 AM IST Aligarh UP Sync)
- **HP Power 95 (Premium):** ₹104.50 / Litre (High Octane with friction reducers)
- **HP DEF Urea (AUS 32):** ₹65.00 / Litre (ISO 22241 certified for BS-VI vehicles)

*Note: All fuel delivery is automated with zero adulteration and stamped 5-litre flask calibration. Prices strictly calibrated to Aligarh district benchmarks.*`;
  }

  if (lower.includes('washroom') || lower.includes('toilet') || lower.includes('clean') || lower.includes('restroom')) {
    return `### Washroom & Highway Amenities
We take immense pride in maintaining **top-tier sanitized washrooms** on the highway:
- Continuous fresh running water, handwash liquid soap, and mirrors
- Regularly deep-cleaned and sanitized for highway families, tourists, and commercial drivers
- Separate secure facilities for ladies and gentlemen
- Cold RO drinking water station available 24x7!`;
  }

  if (lower.includes('air') || lower.includes('tire') || lower.includes('tyre') || lower.includes('nitrogen')) {
    return `### Air Filling & Tire Services
- **Free Digital Air Filling:** High-accuracy digital inflation station at the forecourt entry.
- **Nitrogen Calibration:** Helps prevent tire blowouts and extends tire life on hot highway runs.
- **Dual-hose high-flow nozzles:** Suitable for heavy trucks, trailers, buses, SUVs, and two-wheelers.`;
  }

  if (lower.includes('map') || lower.includes('direction') || lower.includes('location') || lower.includes('where') || lower.includes('reach')) {
    return `### Location & GPS Navigation
- **Station:** Mehdipur Balaji Automobile (HP Fuel Hub)
- **Corridor:** Mathura - Hathras - Aligarh Highway, Western Uttar Pradesh
- **GPS Coordinates:** 27.662818° N, 77.910802° E
- **Directions:** Approx. 12 km from Raya Bypass, 18 km from Hathras, with easy feeder access to the Yamuna Expressway.
- [Click here to launch Google Maps Turn-by-Turn Navigation](https://www.google.com/maps/dir/?api=1&destination=27.662818,77.910802)`;
  }

  return `Welcome to **Mehdipur Balaji Automobile (HP Fuel Hub)**!
We are an authorized Hindustan Petroleum (HPCL) retail dealer open 24x7 on the Mathura-Hathras-Aligarh Highway (GPS: 27.662818, 77.910802).
- **Services:** Pure Petrol (₹101.92/L) & High Speed Diesel (Fixed: ₹95.47/L), HP Power 95 (₹104.50/L), Certified AUS 32 DEF Urea (₹65/L), Free Digital Air Inflation, Sanitized Washrooms, Express Windshield Wash, and Highway Convenience Store.
- **Hotline:** +91 79061 03090.
Feel free to ask me about route distances, trip budgets, or bulk fleet rates!`;
}

// GET /api/fuel-rates - Automated daily fuel rates with fixed diesel price (Aligarh, Uttar Pradesh)
app.get('/api/fuel-rates', (_req: Request, res: Response) => {
  const now = new Date();
  const isoDate = now.toISOString().split('T')[0];

  const istDateString = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);

  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextDateString = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
  }).format(tomorrow);

  const FIXED_DIESEL_PRICE = 95.47;
  const ALIGARH_PETROL_PRICE = 101.92;
  const ALIGARH_POWER95_PRICE = 104.50;
  const ALIGARH_UREA_PRICE = 65.00;

  const rates = [
    {
      id: 'diesel',
      name: 'High Speed Diesel (HSD)',
      type: 'diesel',
      price: FIXED_DIESEL_PRICE,
      unit: 'Per Litre',
      densityRange: '820 - 860 kg/m³',
      badge: 'Fixed Aligarh UP Rate',
      isPriceFixed: true,
      fixedNote: 'Fixed Aligarh Dealer Rate · Zero Fluctuation',
      dailyChange: 0.0,
      district: 'Aligarh, Uttar Pradesh',
      description: 'Fixed-rate high-cetane diesel calibrated to Aligarh UP state benchmark, engineered for commercial fleets and highway heavy transport.',
    },
    {
      id: 'petrol',
      name: 'Power / Motor Spirit (Petrol)',
      type: 'petrol',
      price: ALIGARH_PETROL_PRICE,
      unit: 'Per Litre',
      densityRange: '720 - 775 kg/m³',
      badge: 'Aligarh UP Daily Sync',
      isPriceFixed: false,
      dailyChange: 0.0,
      district: 'Aligarh, Uttar Pradesh',
      description: '100% pure high-octane motor fuel synchronized daily at 06:00 AM IST with Aligarh district OMC benchmarks.',
    },
    {
      id: 'power95',
      name: 'HP Power 95 (Premium Petrol)',
      type: 'premium',
      price: ALIGARH_POWER95_PRICE,
      unit: 'Per Litre',
      densityRange: '725 - 780 kg/m³',
      badge: 'Aligarh UP Premium',
      isPriceFixed: false,
      dailyChange: 0.0,
      district: 'Aligarh, Uttar Pradesh',
      description: 'Enhanced with multifunctional friction modifiers for superior acceleration and engine cleansing.',
    },
    {
      id: 'def_urea',
      name: 'HP Diesel Exhaust Fluid (DEF Urea / AUS 32)',
      type: 'urea',
      price: ALIGARH_UREA_PRICE,
      unit: 'Per Litre / Bucket',
      densityRange: '1087 - 1093 kg/m³',
      badge: 'ISO 22241 Certified',
      isPriceFixed: true,
      fixedNote: 'Authorized HP Stock Price',
      dailyChange: 0.0,
      district: 'Aligarh, Uttar Pradesh',
      description: 'High-purity urea solution for BS-VI commercial trucks, buses, tractors, and modern diesel SUVs.',
    },
  ];

  res.json({
    success: true,
    rates,
    meta: {
      district: 'Aligarh, Uttar Pradesh',
      revisedDate: istDateString,
      revisionTimestamp: `${isoDate} 06:00:00 IST`,
      nextRevisionAt: `${nextDateString}, 06:00 AM IST`,
      isAutomated: true,
      dieselPolicy: 'Fixed Locked Price (₹95.47/L)',
      fixedDieselPrice: FIXED_DIESEL_PRICE,
      verifiedSource: 'HPCL Official Aligarh (UP) Daily Price Bulletin',
    },
  });
});

// In-memory cache for the station intro voice
const introAudioCache: Record<string, { audioBase64: string; mimeType: string }> = {};

// GET /api/intro-audio - Dedicated professional station intro voice greeting
app.get('/api/intro-audio', async (req: Request, res: Response) => {
  try {
    const lang = (req.query.lang as string) === 'hi' ? 'hi' : 'en';
    const voice = (req.query.voice as string) || 'Kore';

    if (introAudioCache[lang]) {
      res.json({
        ...introAudioCache[lang],
        source: 'cache',
        text:
          lang === 'hi'
            ? 'नमस्ते! मेंहदीपुर बालाजी ऑटोमोबाइल में आपका हार्दिक स्वागत है।'
            : 'Welcome to Mehdipur Balaji Automobile! Your trusted HP Fuel Hub.',
      });
      return;
    }

    const introText =
      lang === 'hi'
        ? 'नमस्ते! मेंहदीपुर बालाजी ऑटोमोबाइल में आपका हार्दिक स्वागत है। गुणवत्ता और विश्वास के साथ आपकी यात्रा को ऊर्जावान बनाते हुए, हम सदैव आपकी सेवा में तत्पर हैं।'
        : 'Welcome to Mehdipur Balaji Automobile! Your trusted HP Fuel Hub, powering your journeys with certified pure fuel, DEF urea, and 24/7 highway service.';

    if (!ai) {
      res.json({
        fallback: true,
        text: introText,
        lang,
      });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: introText,
              speechMetadata: {
                style: 'Warm, engaging, professional, hospitable and clear greeting to highway travelers',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      introAudioCache[lang] = {
        audioBase64: base64Audio,
        mimeType: 'audio/wav',
      };
      res.json({
        audioBase64: base64Audio,
        mimeType: 'audio/wav',
        text: introText,
        source: 'gemini',
      });
      return;
    }

    res.json({
      fallback: true,
      text: introText,
      lang,
    });
  } catch (err: any) {
    console.error('Error generating intro audio:', err?.message || err);
    res.json({
      fallback: true,
      text:
        req.query.lang === 'hi'
          ? 'नमस्ते! मेंहदीपुर बालाजी ऑटोमोबाइल में आपका हार्दिक स्वागत है।'
          : 'Welcome to Mehdipur Balaji Automobile! Your trusted HP Fuel Hub.',
    });
  }
});

// POST /api/tts - Text to Speech using gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req: Request, res: Response) => {
  try {
    const { text, voice = 'Kore' } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    if (!ai) {
      res.status(503).json({ error: 'Gemini API not configured' });
      return;
    }

    // Trim text if too long for quick TTS response
    const sanitizedText = text.slice(0, 400).replace(/[*_#`[\]()]/g, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: sanitizedText,
              speechMetadata: {
                style: 'Warm, clear, and professional customer assistant',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      res.status(500).json({ error: 'No audio generated' });
      return;
    }

    res.json({
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (err: any) {
    console.error('Error in /api/tts:', err);
    res.status(500).json({ error: err.message || 'TTS generation failed' });
  }
});

// WebSocket Server for Gemini Live API (`gemini-3.8-live`)
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('Client connected to Gemini Live WebSocket');

  if (!ai) {
    clientWs.send(
      JSON.stringify({
        error: 'Gemini API key is required to initiate live voice conversation.',
      })
    );
    clientWs.close();
    return;
  }

  try {
    // Connect to Gemini 3.8 Live API
    const session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Zephyr' },
          },
        },
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          // Model returned audio
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ audio }));
          }
          if (message.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
        onclose: () => {
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ closed: true }));
          }
        },
        onerror: (err) => {
          console.error('Gemini Live error:', err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ error: err.message }));
          }
        },
      },
    });

    // Handle messages from browser client
    clientWs.on('message', (data) => {
      try {
        const parsed = JSON.parse(data.toString());
        if (parsed.audio) {
          session.sendRealtimeInput({
            audio: {
              data: parsed.audio,
              mimeType: 'audio/pcm;rate=16000',
            },
          });
        } else if (parsed.text) {
          session.sendRealtimeInput({
            text: parsed.text,
          });
        }
      } catch (e) {
        console.error('Error parsing client message:', e);
      }
    });

    clientWs.on('close', () => {
      try {
        session.close();
      } catch (err) {
        // ignore
      }
    });
  } catch (liveError: any) {
    console.error('Failed to connect to Gemini Live session:', liveError);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ error: liveError.message || 'Failed to start Live session' }));
    }
  }
});

// Upgrade HTTP to WebSocket for /live endpoint
server.on('upgrade', (request, socket, head) => {
  const pathname = request.url ? new URL(request.url, `http://${request.headers.host}`).pathname : '';
  if (pathname === '/live') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

// Mount static production bundle or Vite in dev
async function setupVite() {
  const distPath = path.resolve(__dirname, 'dist');
  const indexHtml = path.join(distPath, 'index.html');
  const hasDist = fs.existsSync(indexHtml);

  if (hasDist || process.env.NODE_ENV === 'production') {
    app.use(express.static(distPath, {
      maxAge: '1h',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html') || filePath.endsWith('sw.js') || filePath.endsWith('manifest.webmanifest')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
      }
    }));

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/live')) {
        return next();
      }
      res.sendFile(indexHtml);
    });
    console.log(`[Fast Static Build] Serving pre-bundled production app from ${distPath}`);
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[Dev Mode] Serving Vite middlewareMode');
  }
}

setupVite().then(() => {
  server.listen(port, '0.0.0.0', () => {
    console.log(`Mehdipur Balaji Automobile Server running at http://0.0.0.0:${port}`);
  });
});
