class GetArcgisToken {
  ClientID: string = "L0vD9F1TdVIFnKp1";
  ClientSecret: string = "15edb2f979e4413da365015f1fab2c75";

  async getData() {
    try {
      const response = await fetch(`https://www.arcgis.com/sharing/oauth2/token?client_id=${this.ClientID}&grant_type=client_credentials&client_secret=${this.ClientSecret}&f=pjson`);
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

export const GetArcgisTokenDataService = new GetArcgisToken();

