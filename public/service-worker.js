// Evento de instalación
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/bundle.js',
        '/static/js/0.chunk.js',
        '/static/js/main.chunk.js',
      ]);
    })
  );
});

// Evento de activación
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if ('my-cache' !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        return res; // Si el recurso está en la caché, lo devuelve
      }

      // Si no, hace una petición a la red y almacena el recurso en la caché para futuras solicitudes
      return fetch(event.request).then((response) => {
        return caches.open('my-cache').then((cache) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });
    })
  );
});