/**
 * EnglishPath — Service Worker
 * Cache-first strategy for offline-first PWA.
 * Bump CACHE_NAME version whenever files are added/changed.
 */

const CACHE_NAME = 'englishpath-v19';

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
  './assets/css/ielts-skill.css',
  './assets/css/simulation.css',
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
  './assets/js/data/ielts-speaking-data.js',
  './assets/js/data/ielts-writing-data.js',
  './assets/js/data/ielts-simulation-data.js',
  './assets/css/toeic.css',
  './assets/js/data/toeic-vocab-data.js',
  './assets/js/pages/toeic-vocab.js',
  './pages/toeic/index.html',
  './pages/toeic/vocabulary.html',
  './pages/toeic/listening.html',
  './assets/js/data/toeic-listening-data.js',
  './assets/js/pages/toeic-listening.js',
  './pages/toeic/reading.html',
  './assets/js/data/toeic-reading-data.js',
  './assets/js/pages/toeic-reading.js',
  './pages/toeic/simulation.html',
  './pages/toeic/result.html',
  './assets/js/data/toeic-simulation-data.js',
  './assets/js/pages/toeic-simulation.js',
  './assets/js/pages/toeic-result.js',
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
  './assets/js/pages/ielts-speaking.js',
  './assets/js/pages/ielts-writing.js',
  './assets/js/pages/ielts-simulation.js',
  './assets/js/pages/ielts-result.js',
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
  './pages/ielts/speaking.html',
  './pages/ielts/writing.html',
  './pages/ielts/simulation.html',
  './pages/ielts/result.html',
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
  './assets/css/toefl.css',
  './assets/js/data/toefl-vocab-data.js',
  './assets/js/pages/toefl-vocab.js',
  './pages/toefl/index.html',
  './pages/toefl/vocabulary.html',
  './pages/toefl/reading.html',
  './pages/toefl/listening.html',
  './assets/js/data/toefl-reading-data.js',
  './assets/js/data/toefl-listening-data.js',
  './assets/js/data/toefl-speaking-data.js',
  './assets/js/data/toefl-writing-data.js',
  './assets/js/pages/toefl-speaking.js',
  './assets/js/pages/toefl-writing.js',
  './pages/toefl/speaking.html',
  './pages/toefl/writing.html',
  './assets/js/data/toefl-simulation-data.js',
  './assets/js/pages/toefl-simulation.js',
  './assets/js/pages/toefl-result.js',
  './pages/toefl/simulation.html',
  './pages/toefl/result.html',
  './assets/js/pages/toefl-reading.js',
  './assets/js/pages/toefl-listening.js',
  './assets/css/cambridge.css',
  './assets/js/data/cambridge-vocab-data.js',
  './assets/js/pages/cambridge-vocab.js',
  './pages/cambridge/index.html',
  './pages/cambridge/vocabulary.html',
  './assets/js/data/cambridge-reading-data.js',
  './assets/js/data/cambridge-listening-data.js',
  './assets/js/pages/cambridge-reading.js',
  './assets/js/pages/cambridge-listening.js',
  './pages/cambridge/reading.html',
  './pages/cambridge/listening.html',
  './assets/js/data/cambridge-writing-data.js',
  './assets/js/data/cambridge-speaking-data.js',
  './assets/js/pages/cambridge-writing.js',
  './assets/js/pages/cambridge-speaking.js',
  './pages/cambridge/writing.html',
  './pages/cambridge/speaking.html',
  './assets/js/data/cambridge-simulation-data.js',
  './assets/js/pages/cambridge-simulation.js',
  './assets/js/pages/cambridge-result.js',
  './pages/cambridge/simulation.html',
  './pages/cambridge/result.html',
  // Fase 17a — Advanced C1–C2
  './assets/css/advanced.css',
  './assets/js/data/advanced-vocab-data.js',
  './assets/js/pages/advanced-vocab.js',
  './pages/advanced/index.html',
  './pages/advanced/vocabulary.html',
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
