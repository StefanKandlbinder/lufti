class GetReverseGeo {
  async getData(location, token) {
    try {
      const response = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?outSr=4326&returnIntersection=false&location=${location.longitude},${location.latitude}&distance=10&token=${token}&f=json`);
      const json = await response.json();
      this.handleErrors(response);
      return json;
    }
    catch(err) {
      console.log(err);
    }
  }

  handleErrors(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }
}

export const GetReverseGeoDataService = new GetReverseGeo();
