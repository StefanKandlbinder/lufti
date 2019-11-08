class GetStation {
  async getData() {
    try {
      const response = await fetch('https://api.luftdaten.info/static/v2/data.dust.min.json');
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

export const DataService = new GetStation();
