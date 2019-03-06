import { Component, State, Prop, Watch } from '@stencil/core';

import getArcgisToken from '../../services/getArcgisToken';

@Component({
  tag: 'lufti-reverse-geo',
  styleUrl: 'lufti-reverse-geo.css',
  shadow: true
})
export class LuftiReverseGeo {
  @Prop({mutable: true, reflectToAttr: true}) location: { latitude: string, longitude: string };

  @Watch('location')
  validateName(newValue: {latitude: string, longitude:string}, oldValue: {latitude: string, longitude:string}) {
    if (oldValue !== newValue && newValue.latitude !== "") {
      this.getReverseGeo(this.reverseGeoToken);
    }
  }

  @State() reverseGeoToken: { token: "", timestamp: Number };
  @State() reverseGeoData: {address};
  @State() loading: boolean;

  hostData() {
    return {
      'class': { 's-loading': this.loading }
    };
  }

  componentDidLoad() {
    this.getToken();
  }

  getToken() {
    getArcgisToken()
      .then((res) => {
        let token = {
          token: res.access_token,
          timestamp: Date.now()
        };

        this.reverseGeoToken = token;
        this.getReverseGeo(token);
      })
      .catch((err) => {
        this.reverseGeoToken.token = "";
        console.log(err);
      });
  }

  getReverseGeo(token) {
    this.loading = true;

    if (token !== undefined) {
      fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?outSr=4326&returnIntersection=false&location=${this.location.longitude},${this.location.latitude}&distance=10&token=${token.token}&f=json`)
        .then(res => {
          if (res.status !== 200) {
            this.loading = false;
            throw new Error('Invalid!');
          }
          return res.json();
        })
        .then(parsedRes => {
          this.reverseGeoData = parsedRes;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  render() {
    let address = "";

    if (this.reverseGeoData && this.reverseGeoData.address) {
      address = this.reverseGeoData.address.ShortLabel + ", " + this.reverseGeoData.address.City + ", " + this.reverseGeoData.address.CountryCode
    }


    return ([
      <div class="lufti-reverse-geo__loading "><span>.</span><span>.</span><span>.</span></div>,
      <div class="lufti-reverse-geo-result">
        {address}
      </div>
      ]
    );
  }
}
