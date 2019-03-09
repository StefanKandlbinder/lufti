importScripts('workbox-v3.4.1/workbox-sw.js');

self.workbox.precaching.precacheAndRoute([]);

/* self.workbox.setConfig({
  debug: true
}) */

self.workbox.routing.registerRoute(
  new RegExp('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/.*', 'g'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 1000,
        maxAgeSeconds: 365 * 24 * 60 * 60
      })
    ]
  })
);

self.workbox.routing.registerRoute(
  new RegExp('https://api.luftdaten.info/v1/sensor/.*', 'g'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 1000,
        maxAgeSeconds: 3 * 60
      })
    ]
  })
);
