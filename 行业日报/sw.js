var CACHE = 'studyagent-v3';
var ASSETS = ['./','./index.html','./styles.css','./app.js','./tree.js','./notes.js','./notes/index.json','./manifest.json','./data/reports.js','./data/tech_tree.js','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      var cl = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, cl); });
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (c) { return c || caches.match('./index.html'); });
    })
  );
});