export class Luftdaten {
  components: {
      pm10: string,
      pm25: string
  };
  location: {
    longitude: string,
    latitude: string
  };
  timestamp: string;

  constructor(components: { pm10: string, pm25: string },
    location: { longitude: string, latitude: string },
    timestamp: string) {
      this.components = components;
      this.location = location;
      this.timestamp = timestamp;
    }
}
