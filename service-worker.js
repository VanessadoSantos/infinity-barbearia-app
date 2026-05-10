// ==========================
// CACHE NAME
// ==========================

const CACHE_NAME = 'infinity-barbearia-v1';

// ==========================
// ARQUIVOS PARA CACHE
// ==========================

const urlsToCache = [

  './',
  './index.html',
  './agendamento.html',

  './style.css',
  './agendamento.css',

  './script.js',
  './manifest.json',

];

// ==========================
// INSTALAÇÃO
// ==========================

self.addEventListener('install', event => {

  console.log('Service Worker instalado');

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => {

        return cache.addAll(urlsToCache);

      })

  );

});

// ==========================
// ATIVAÇÃO
// ==========================

self.addEventListener('activate', event => {

  console.log('Service Worker ativado');

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if(key !== CACHE_NAME){

            return caches.delete(key);

          }

        })

      );

    })

  );

});

// ==========================
// FETCH
// ==========================

self.addEventListener('fetch', event => {

  event.respondWith(

    caches.match(event.request)

      .then(response => {

        // CACHE FIRST

        return response || fetch(event.request);

      })

  );

});