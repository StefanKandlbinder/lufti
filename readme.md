# Lufti

... is a simple PWA built with [StencilJS](https://stenciljs.com/) to fetch air pollution data of a specific sensor from [Luftdaten Info](https://luftdaten.info/).

## Getting Started

The app is free hosted by Netlify and can be reached under this link: [https://lufti.netlify.com](https://lufti.netlify.com).

Just put in your Sensor ID and you will get the latest data from the server.

![lufti](https://github.com/StefanKandlbinder/lufti/raw/master/src/assets/gif/Lufti.gif)

## Data

The Sensor ID is stored via Local Storage, so by clearing the website data or updating the browser, your Sensor ID will get lost.

## PWA Icon Generator

### npm
[PWA Asset Generator](https://www.npmjs.com/package/pwa-asset-generator)

### console
```
pwa-asset-generator ./src/assets/icon/Logo.svg ./src/assets/pwa/ -f -b "rgba(45, 121, 185, 1)" -i ./src/index.html -m ./src/manifest.json
```
