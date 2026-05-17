// ========================================
// CACHE NAME
// ========================================

const CACHE_NAME =
'infinity-barbearia-v2';

// ========================================
// FILES TO CACHE
// ========================================

const urlsToCache = [

    '/',

    '/index.html',

    '/style/style.css',

    '/js/script.js',

    '/assets/images/banner.jpg',

    '/assets/icons/icon-192.png',

    '/assets/icons/icon-512.png'

];

// ========================================
// INSTALL
// ========================================

self.addEventListener(

    'install',

    (event) => {

        console.log(
            'Service Worker instalado.'
        );

        event.waitUntil(

            caches
            .open(CACHE_NAME)

            .then((cache) => {

                return cache.addAll(
                    urlsToCache
                );

            })

        );

        self.skipWaiting();

    }

);

// ========================================
// ACTIVATE
// ========================================

self.addEventListener(

    'activate',

    (event) => {

        console.log(
            'Service Worker ativado.'
        );

        event.waitUntil(

            caches.keys()

            .then((cacheNames) => {

                return Promise.all(

                    cacheNames.map(

                        (cache) => {

                            if(
                                cache !== CACHE_NAME
                            ){

                                console.log(
                                    'Cache antigo removido:',
                                    cache
                                );

                                return caches.delete(
                                    cache
                                );

                            }

                        }

                    )

                );

            })

        );

        self.clients.claim();

    }

);

// ========================================
// FETCH
// ========================================

self.addEventListener(

    'fetch',

    (event) => {

        event.respondWith(

            caches.match(
                event.request
            )

            .then((response) => {

                // CACHE FIRST

                if(response){

                    return response;

                }

                // NETWORK FALLBACK

                return fetch(
                    event.request
                )

                .then((networkResponse) => {

                    return caches.open(
                        CACHE_NAME
                    )

                    .then((cache) => {

                        cache.put(
                            event.request,
                            networkResponse.clone()
                        );

                        return networkResponse;

                    });

                });

            })

            .catch(() => {

                // OFFLINE FALLBACK

                if(
                    event.request.destination ===
                    'image'
                ){

                    return caches.match(
                        '/assets/images/banner.jpg'
                    );

                }

            })

        );

    }

);
