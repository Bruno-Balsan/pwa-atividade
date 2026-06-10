const CACHE_NAME = "pwa-cache-v1";

const ARQUIVOS_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon.svg"
];

// Instala o Service Worker e salva os arquivos no cache
self.addEventListener("install", event => {
  console.log("Service Worker instalando.");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARQUIVOS_CACHE);
    })
  );

  self.skipWaiting();
});

// Ativa o novo Service Worker e apaga caches antigos
self.addEventListener("activate", event => {
  console.log("Service Worker ativado.");

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log("Cache antigo removido:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Intercepta requisições e usa cache
self.addEventListener("fetch", event => {
  console.log("Requisição de fetch para:", event.request.url);

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Log para teste de notificação push
self.addEventListener("push", event => {
  console.log("Notificação push recebida:", event);
});