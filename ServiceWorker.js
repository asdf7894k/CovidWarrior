const cacheName = "Penpeer-Moderna-Covid-Vaccine-0.0.5";
const contentToCache = [
    "Build/CovidWarrior.loader.js?id=0.0.5",
    "Build/CovidWarrior.framework.js.unityweb?id=0.0.5",
    "Build/CovidWarrior.data.unityweb?id=0.0.5",
    "Build/CovidWarrior.wasm.unityweb?id=0.0.5",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
 
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== "Penpeer-Moderna-Covid-Vaccine-0.0.5") {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
