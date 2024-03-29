importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

self.workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

/* self.workbox.setConfig({
  debug: true
}) */

self.workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg|ico)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

self.workbox.routing.registerRoute(
  new RegExp('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/.*', 'g'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 365 * 24 * 60 * 60
      })
    ]
  })
);

self.workbox.routing.registerRoute(
  new RegExp('https://www.arcgis.com/sharing/oauth2/.*', 'g'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 1 * 60 * 60
      })
    ]
  })
);

self.workbox.routing.registerRoute(
  new RegExp('https://api.luftdaten.info/static/v2/.*', 'g'),
  new workbox.strategies.CacheFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 5 * 60
      })
    ]
  })
);
