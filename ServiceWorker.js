const cacheName = "DefaultCompany-Moderna-Covid-Vaccine-0.0.3";
const contentToCache = [
    "Build/CovidWarrior.loader.js",
    "Build/165d5dea530155f6ce45c3007d85c32b.js.unityweb",
    "Build/02864df8e1d20c5da11398d1479483a2.data.unityweb",
    "Build/0b82b215ed7983175570806d400557f1.wasm.unityweb",
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
