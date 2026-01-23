const CACHE_NAME = "dj-cache-v1";

const APP_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./js/app.js",
  "./js/player.js",
  "./js/search.js",
  "./js/waveform.js",
  "./js/state.js",
  "./manifest.json"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_ASSETS))
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
