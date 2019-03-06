import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  outputTargets: [
    {
      type: 'www',
      // uncomment the following line to disable service workers in production
      // serviceWorker: null
      serviceWorker: {
        runtimeCaching: [{
          urlPattern: /https:\/\/geocode.arcgis.com\/arcgis\/rest\/services\/World\/GeocodeServer\/.*/g,
          handler: 'networkFirst',
          options: {
            // Fall back to the cache after 10 seconds.
            networkTimeoutSeconds: 10,
            // Use a custom cache name for this route.
            cacheName: 'reversegeo-caching',
            // Configure custom cache expiration.
            expiration: {
              maxEntries: 1000,
              maxAgeSeconds: 365 * 24 * 60 * 60,
            },
            // Configure background sync.
            backgroundSync: {
              name: 'my-queue-name',
              options: {
                maxRetentionTime: 365 * 24 * 60 * 60,
              },
            },
            // Configure which responses are considered cacheable.
            cacheableResponse: {
              statuses: [0, 200],
              headers: { 'x-test': 'true' },
            },
            // Configure the broadcast cache update plugin.
            broadcastUpdate: {
              channelName: 'my-update-channel',
            },
            // Add in any additional plugin logic you need.
            plugins: [
              { cacheDidUpdate: () => /* custom plugin code */}
            ],
          }
        }]
      }
    }
  ]
};
