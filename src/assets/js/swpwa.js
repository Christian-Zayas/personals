'use strict'
// assign name & version from the cache
const CACHE_NAME = "v1_cache_notes";

// Search files in the application
var urlToCache = [
    '/',
    '/css/bootstrap.min.css',
    '/css/main.css',
    '/js/jquery-3.4.1.slim.min.js',
    '/js/bootstrap.min.js',
    '/js/fontawesome.js',
    '/js/main.js',
    '/js/popper.min.js',
    '/img/undraw_dev_focus_b9xo.svg',
    '/img/undraw_online_calendar_kvu2.svg',
    '/img/undraw_personal_notebook_sobb.svg',
    '/img/undraw_private_data_7q35.svg',
    '/img/undraw_proud_self_1ddv.svg',
    '/img/img-notes/notes-16.png',
    '/img/img-notes/notes-32.png',
    '/img/img-notes/notes-64.png',
    '/img/img-notes/notes-96.png',
    '/img/img-notes/notes-128.png',
    '/img/img-notes/notes-192.png',
    '/img/img-notes/notes-256.png',
    '/img/img-notes/notes-384.png',
    '/img/img-notes/notes-512.png',
    '/img/img-notes/notes-1024.png'
];


// Event install services worker
 
self.addEventListener('install' , e => {
    e.waitUntil(
      caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlToCache)
                                 .then( () => self.skipWaiting())
            )
            .catch(error => console.log(error))         
    )
})

// Event Activate

self.addEventListener('activate' , e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cachesNames => {
                return Promise.all(
                    cachesNames.map(cacheName => {
                        if(cacheName.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
            .then(() => {
                // activar la cache
                self.clients.claim();
            })
    )
});

// Event fetch

self.addEventListener('fetch' ,  e => {
    e.respondWith(
        caches.match(e.request)
              .then(res => { 
                  if( res) return res;
                  return fetch(e.request);
                })
    )
})

