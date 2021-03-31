import { Component, State, Prop, Host, Watch, h } from '@stencil/core';

import { GetArcgisTokenDataService } from '../../services/getArcgisToken';
import { GetReverseGeoDataService } from '../../services/getReverseGeo';
import { saveState, loadState } from '../../store/localStorage';

@Component({
  tag: 'lufti-reverse-geo',
  styleUrl: 'lufti-reverse-geo.css',
  shadow: true
})
export class LuftiReverseGeo {
  @Prop({ mutable: true, reflect: true }) location: { latitude: string, longitude: string };

  @Watch('location')
  validateName(newValue: { latitude: string, longitude:string }, oldValue: { latitude: string, longitude:string }) {
    if (oldValue !== newValue && newValue.latitude !== "") {
      if (this.reverseGeoToken !== undefined && (this.reverseGeoToken.expires + this.reverseGeoToken.timestamp) > Date.now()) {
        this.getToken();
      }
      else {
        this.getReverseGeo(this.reverseGeoToken);
      }
    }

    if (newValue.longitude === "") {
      this.reverseGeoData = null;
    }
  }

  @State() reverseGeoToken: { token: "", expires: number,  timestamp: number };
  @State() reverseGeoData: { address };
  @State() loading: boolean;

  /**
   * fetch a valid ARCGIS token
   */
  componentDidLoad() {
    this.getToken();
  }

  getToken() {
    GetArcgisTokenDataService.getData()
      .then((res) => {
        let token = {
          token: res.access_token,
          expires: res.expires_in,
          timestamp: Date.now()
        };

        this.reverseGeoToken = token;

        if (loadState("id") !== undefined)
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
      GetReverseGeoDataService.getData(this.location, token.token)
        .then(res => {
          this.reverseGeoData = res;
          this.loading = false;

          saveState("reverseGeo", { [loadState("id").stationID]: res });
        })
        .catch(err => {
          this.reverseGeoData = null;
          this.loading = false;
          console.log(err);
        })
    }
  }

  render() {
    let address = "";

    if (this.reverseGeoData && this.reverseGeoData.address) {
      address = this.reverseGeoData.address.ShortLabel + ", " + this.reverseGeoData.address.City + ", " + this.reverseGeoData.address.CountryCode
    }

    return <Host
      class={{
        's-loading': this.loading
      }}>
      <div class="lufti-reverse-geo__loading "><span>.</span><span>.</span><span>.</span></div>
      <div class="lufti-reverse-geo-result">
        { address }
      </div>
      </Host>;
  }
}
