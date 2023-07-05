self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/static/js/bundle.js', // cachea el archivo JS principal
          '/static/js/0.chunk.js', // cachea los archivos JS adicionales
          '/static/js/main.chunk.js', // estos nombres pueden variar
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  });
  