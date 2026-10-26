export type Language = 'en' | 'hi';

export interface Translations {
  stationTitle: string;
  stationTagline: string;
  authorizedDealer: string;
  statusLive: string;
  navRates: string;
  navServices: string;
  navAbout: string;
  navCalculator: string;
  navPhotos: string;
  navLocation: string;
  navCopilot: string;
  navHostFree: string;
  getDirections: string;
  callNow: string;
  calculateTrip: string;
  liveRatesTitle: string;
  liveRatesSubtitle: string;
  densityTested: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  servicesTitle: string;
  servicesSubtitle: string;
  mapTitle: string;
  mapSubtitle: string;
  reviewsTitle: string;
  aboutTitle: string;
  whyChooseUs: string;
  forecourtTelemetry: string;
  bayInspector: string;
  downloadApp: string;
  downloadAppDesc: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    stationTitle: 'Mehdipur Balaji Automobile',
    stationTagline: 'Powering The journeys With Quality And Trust',
    authorizedDealer: 'Authorized HP Fuel Hub · Retail Outlet',
    statusLive: 'LIVE 24×7 OPEN & OPERATIONAL',
    navRates: 'Fuel & Rates',
    navServices: 'Our Services',
    navAbout: 'About Us',
    navCalculator: 'Trip Calculator',
    navPhotos: 'Station Photos',
    navLocation: 'Location & Map',
    navCopilot: 'AI Co-Pilot & Voice',
    navHostFree: 'Host on Google (Free)',
    getDirections: 'Get Highway Directions',
    callNow: 'Call Station Desk',
    calculateTrip: 'Trip Fuel Calculator',
    liveRatesTitle: 'Live Fuel & DEF Rates Board',
    liveRatesSubtitle: 'Real-time daily rates synchronized at 06:00 AM IST. Pure fuels calibrated to BIS specifications.',
    densityTested: '15°C Hydrometer Density Checked',
    pillarsTitle: 'The 4 Pillars of Fuel Quality & Purity',
    pillarsSubtitle: 'Verifiable calibration standards tested daily for 100% customer peace of mind.',
    servicesTitle: 'Our Premium Services',
    servicesSubtitle: 'Engineered around traveler convenience, vehicle performance, and highway journey safety.',
    mapTitle: 'Interactive Highway Map & Location',
    mapSubtitle: 'Conveniently positioned on the Mathura-Hathras Highway corridor with 24/7 access.',
    reviewsTitle: 'Customer Testimonials & Reviews',
    aboutTitle: 'ABOUT US',
    whyChooseUs: 'Why Choose Us?',
    forecourtTelemetry: 'Live Forecourt IoT Telemetry',
    bayInspector: 'Interactive Forecourt Bay Inspector',
    downloadApp: 'Download App',
    downloadAppDesc: 'Install our official mobile app for 1-tap offline fuel rates, GPS directions, and AI Highway Co-Pilot.',
  },
  hi: {
    stationTitle: 'मेंहदीपुर बालाजी ऑटोमोबाइल',
    stationTagline: 'गुणवत्ता और विश्वास के साथ आपकी यात्रा को ऊर्जावान बनाते हुए',
    authorizedDealer: 'अधिकृत एचपी फ्यूल हब · हिंदुस्तान पेट्रोलियम डीलर',
    statusLive: 'लाइव 24×7 खुला और चालू',
    navRates: 'ईंधन एवं दैनिक दरें',
    navServices: 'हमारी सुविधाएं',
    navAbout: 'हमारे बारे में',
    navCalculator: 'यात्रा खर्च कैलकुलेटर',
    navPhotos: 'पेट्रोल पंप फोटो',
    navLocation: 'स्थान एवं हाईवे मैप',
    navCopilot: 'एआई वॉयस असिस्टेंट',
    navHostFree: 'गूगल पर फ्री अपलोड',
    getDirections: 'हाईवे रास्ता (गूगल मैप)',
    callNow: 'स्टेशन पर कॉल करें',
    calculateTrip: 'ईंधन खर्च कैलकुलेटर',
    liveRatesTitle: 'दैनिक डीजल, पेट्रोल व यूरिया दरें',
    liveRatesSubtitle: 'प्रतिदिन सुबह 06:00 बजे सटीक कैलिब्रेटेड दरें। बीआईएस एवं एचपीसीएल मानकों पर पूर्ण शुद्ध।',
    densityTested: '15°C हाइड्रोमीटर घनत्व जांच',
    pillarsTitle: 'ईंधन शुद्धता एवं गुणवत्ता के 4 स्तंभ',
    pillarsSubtitle: 'हर ग्राहक के लिए फिल्टर पेपर एवं 5-लीटर सरकारी नाप जांच की पूर्ण सुविधा उपलब्ध।',
    servicesTitle: 'हमारी प्रमुख सेवाएं एवं सुविधाएं',
    servicesSubtitle: 'हाईवे यात्रियों, ट्रक चालकों एवं किसान भाइयों के लिए विश्वस्तरीय सुविधाएं।',
    mapTitle: 'हाईवे लोकेशन एवं गूगल मैप',
    mapSubtitle: 'मथुरा-हाथरस मुख्य हाईवे मार्ग पर स्थित। भारी वाहनों एवं बसों के लिए सुगम प्रवेश।',
    reviewsTitle: 'ग्राहकों के अनुभव एवं समीक्षाएं',
    aboutTitle: 'हमारे बारे में',
    whyChooseUs: 'हमें क्यों चुनें?',
    forecourtTelemetry: 'लाइव फोरकोर्ट आईओटी टेलीमेट्री',
    bayInspector: 'फोरकोर्ट बे एवं डिस्पेंसर गाइड',
    downloadApp: 'ऐप डाउनलोड करें',
    downloadAppDesc: 'ऑफलाइन दैनिक दरें, जीपीएस हाईवे मैप और एआई को-पायलट के लिए ऑफिशियल ऐप डाउनलोड करें।',
  },
};
