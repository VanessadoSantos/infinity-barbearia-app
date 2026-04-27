const CACHE_NAME = "barbearia-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/agendamento.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/images/logo.png",
  "/images/ambiente.png",
  "/images/equipe.png",
  "/images/acessorios (1).jpg",
  "/images/cabelo (1).jpg",
  "/images/Barba (1).jpg",
  "/images/Barba (2).jpg"
];

self.addEventListener("install", event => {
  console.log("Service Worker installing.");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  console.log("Service Worker activating.");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
