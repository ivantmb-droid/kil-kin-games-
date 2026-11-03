/* KIL'KIN Games service worker v6 */
const CACHE = 'kilkin-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './images/logo.jpg',
  './images/logo.png',
  './images/kitten.jpg',
  './images/puppy.jpg',
  './images/house.jpg',
  './images/cow.jpg',
  './images/balloon.jpg',
  './images/car.jpg',
  './images/plane.jpg',
  './images/bear.jpg',
  './images/rainbow.jpg',
  './images/cake.jpg',
  './images/ship.jpg',
  './images/hedgehog.jpg',
  './sounds/click.wav',
  './sounds/pickup.wav',
  './sounds/correct.wav',
  './sounds/error.wav',
  './sounds/win.wav',
  './sounds/pop.wav',
  './sounds/melody.wav'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        if (res.ok && new URL(req.url).origin === self.location.origin) {
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
