// Mehdipur Balaji Automobile - Robust Highway Offline Service Worker (v2)
const CACHE_NAME = 'hp-balaji-v2';
const PRECACHE_URLS = [
  '/',
  '/manifest.webmanifest',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/apple-touch-icon.png',
  '/images/hp_logo.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('Precache warning (non-fatal):', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Never intercept non-GET requests or websocket connections
  if (request.method !== 'GET' || url.protocol.startsWith('ws')) {
    return;
  }

  // 2. Never intercept dev server internals, Gemini APIs, or live audio
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/live') ||
    url.pathname.startsWith('/@vite') ||
    url.pathname.startsWith('/@id') ||
    url.pathname.startsWith('/src')
  ) {
    return;
  }

  // 3. Navigation requests (HTML page): Network-first with offline cached fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const rootFallback = await caches.match('/');
          if (rootFallback) return rootFallback;
          return caches.match('/index.html');
        })
    );
    return;
  }

  // 4. Static assets (images, fonts, css, js): Cache-first with network fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch and update cache in background (non-blocking)
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      }).catch(() => {
        // Return fallback if available, but never throw undefined
        return cachedResponse || new Response('', { status: 408, statusText: 'Offline' });
      });
    })
  );
});
