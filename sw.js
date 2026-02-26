/**
 * EnglishPath — Service Worker
 * Cache-first strategy for offline-first PWA.
 * Bump CACHE_NAME version whenever files are added/changed.
 */

const CACHE_NAME = 'englishpath-v4';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './404.html',
  './manifest.json',
  './assets/css/main.css',
  './assets/css/layout.css',
  './assets/css/auth.css',
  './assets/css/onboarding.css',
  './assets/css/dashboard.css',
  './assets/css/vocabulary.css',
  './assets/css/grammar.css',
  './assets/css/dialog.css',
  './assets/css/quiz-foundation.css',
  './assets/css/pronunciation.css',
  './assets/css/vocab-intermediate.css',
  './assets/css/grammar-intermediate.css',
  './assets/css/reading-intermediate.css',
  './assets/css/listening-intermediate.css',
  './assets/css/profile.css',
  './assets/css/theme.css',
  './assets/css/planner.css',
  './assets/css/ielts.css',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/js/core/storage.js',
  './assets/js/core/auth.js',
  './assets/js/core/router.js',
  './assets/js/core/app.js',
  './assets/js/modules/xp.js',
  './assets/js/modules/challenge.js',
  './assets/js/modules/badge.js',
  './assets/js/modules/srs.js',
  './assets/js/data/placement-questions.js',
  './assets/js/data/vocabulary-data.js',
  './assets/js/data/grammar-data.js',
  './assets/js/data/dialog-data.js',
  './assets/js/data/quiz-foundation-data.js',
  './assets/js/data/phonetics-data.js',
  './assets/js/data/vocab-intermediate-data.js',
  './assets/js/data/grammar-intermediate-data.js',
  './assets/js/data/reading-intermediate-data.js',
  './assets/js/data/listening-intermediate-data.js',
  './assets/js/data/planner-data.js',
  './assets/js/data/ielts-vocab-data.js',
  './assets/js/data/ielts-reading-data.js',
  './assets/js/data/ielts-listening-data.js',
  './assets/js/pages/dashboard.js',
  './assets/js/pages/onboarding.js',
  './assets/js/pages/vocabulary.js',
  './assets/js/pages/grammar.js',
  './assets/js/pages/dialog.js',
  './assets/js/pages/quiz-foundation.js',
  './assets/js/pages/pronunciation.js',
  './assets/js/pages/vocab-intermediate.js',
  './assets/js/pages/grammar-intermediate.js',
  './assets/js/pages/reading-intermediate.js',
  './assets/js/pages/listening-intermediate.js',
  './assets/js/pages/planner.js',
  './assets/js/pages/ielts-vocab.js',
  './assets/js/pages/ielts-reading.js',
  './assets/js/pages/ielts-listening.js',
  './pages/login.html',
  './pages/register.html',
  './pages/onboarding.html',
  './pages/dashboard.html',
  './pages/profile.html',
  './pages/change-password.html',
  './pages/settings.html',
  './pages/stats.html',
  './pages/theme.html',
  './pages/planner.html',
  './pages/ielts/index.html',
  './pages/ielts/vocabulary.html',
  './pages/ielts/reading.html',
  './pages/ielts/listening.html',
  './pages/foundation/vocabulary.html',
  './pages/foundation/grammar.html',
  './pages/foundation/pronunciation.html',
  './pages/foundation/dialog.html',
  './pages/foundation/quiz.html',
  './pages/intermediate/vocabulary.html',
  './pages/intermediate/grammar.html',
  './pages/intermediate/reading.html',
  './pages/intermediate/listening.html',
  './components/sidebar.html',
];

// ── Install: cache all assets ──────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell...');
      // Cache one by one to not fail entire install if one asset missing
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Failed to cache:', url, err))
        )
      );
    }).then(() => {
      console.log('[SW] Install complete.');
      return self.skipWaiting();
    })
  );
});

// ── Activate: delete old caches ────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => {
            console.log('[SW] Deleting old cache:', k);
            return caches.delete(k);
          })
      )
    ).then(() => {
      console.log('[SW] Activate complete. Now controlling all pages.');
      return self.clients.claim();
    })
  );
});

// ── Fetch: cache-first, network fallback ──────────────────
self.addEventListener('fetch', event => {
  // Skip non-GET and browser-extension requests
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  // Skip Google Fonts (always try network, fallback gracefully)
  if (event.request.url.includes('fonts.googleapis.com') ||
      event.request.url.includes('fonts.gstatic.com')) {
    event.respondWith(
      fetch(event.request).catch(() => new Response('', { status: 200 }))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Only cache successful same-origin responses
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });

        return response;
      }).catch(() => {
        // Offline fallback: return cached index.html for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});

// ── Message: skip waiting on demand ───────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
