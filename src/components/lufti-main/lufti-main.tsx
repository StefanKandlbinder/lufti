import { Component, Listen, State, h } from '@stencil/core';

import { Luftdaten } from '../../models/luftdaten/luftdaten';
import getMood from '../../utilities/getMood';
import RGBtoHex from '../../utilities/RGBtoHex';
import { Ripple } from '../../utilities/Rippler';

@Component({
  tag: 'lufti-main',
  styleUrl: 'lufti-main.css',
  shadow: true
})
export class LuftiMain {
  errorMessage = "Sry, no data here!";
  errorEmoji = "¯\\_(ツ)_/¯";

  @State() luftdaten: Luftdaten;
  @State() luftiID: string;
  @State() isLoading: boolean;

  @Listen('luftdaten', { target: 'body' })
  onLuftdatenEmitted(luftdaten) {
    if (this.luftdaten !== null) {
      this.luftdaten = luftdaten.detail;
    }
  }

  @Listen('luftiID', { target: 'body' })
  onLuftiID(luftiID) {
    if (this.luftiID !== null) {
      this.luftiID = luftiID.detail;
    }
  }

  @Listen('isLoading', { target: 'body' })
  onIsLoading(isLoading) {
    if (this.isLoading !== null) {
      this.isLoading = isLoading.detail;
    }
  }

  componentWillLoad() {
    if (this.luftdaten === null || this.luftdaten === undefined) {
      this.luftdaten = new Luftdaten({ pm10: "0", pm25: "0" }, { longitude: "", latitude: "" }, "");
    }

    this.updateThemeColor();
  }

  /**
   * change the theme color depending on the incoming pm10 value
   */
  updateUI() {
    document.documentElement.style.setProperty('--lufti-color-primary', getMood(this.luftdaten.components.pm10, "1"));
    document.documentElement.style.setProperty('--lufti-color-primary--dark', getMood(this.luftdaten.components.pm10, "0.85"));
    document.documentElement.style.setProperty('--lufti-color-primary--darker', getMood(this.luftdaten.components.pm10, "0.9"));
    document.documentElement.style.setProperty('--lufti-color-primary--weaker', getMood(this.luftdaten.components.pm10, "1"));
    this.updateThemeColor();
  }

  updateThemeColor() {
    document.querySelector('meta[name="theme-color"]').setAttribute("content",  RGBtoHex(getMood(this.luftdaten.components.pm10, "1")));
  }

  render() {
    let luftiContainerClass = "lufti-container";
    let luftiValues = null;
    let luftiLocation = null;
    let luftiLoading = null;

    if (this.luftiID === undefined) {
      luftiContainerClass += " lufti-container--initial";
    }

    if (this.luftdaten) {
      if (this.luftdaten.components.pm10 !== "0") {
        luftiValues = <div class="lufti-air-component-value-container">
          <div class="lufti-air-component-value lufti-air-component-value--pm10">
            { this.luftdaten.components.pm10 }
            <div class="lufti-air-component-title">PM10</div>
          </div>
          <div class="lufti-air-component-value lufti-air-component-value--pm25">
            { this.luftdaten.components.pm25 }
            <div class="lufti-air-component-title">PM25</div>
          </div>
        </div>
      }
      else {
        luftiValues = <div class="lufti-air-component-value-container">
          <div class="lufti-air-component-value lufti-air-component-value--pm10">{ this.luftdaten.components.pm10 !== "0" ? this.luftdaten.components.pm10 : this.errorEmoji }</div>
          <div class="lufti-air-component-value lufti-air-component-value--pm25">{ this.luftdaten.components.pm25 !== "0" ? this.luftdaten.components.pm25 : this.errorMessage }</div>
        </div>
      }

      luftiLocation = <div class={this.isLoading ? "lufti-timestamp s-loading" : "lufti-timestamp"}>
          <lufti-reverse-geo location={ this.luftdaten.location }></lufti-reverse-geo>
          { this.luftdaten.timestamp === "" ? "" : this.luftdaten.timestamp }
        </div>
    }

    if (this.luftdaten.components !== undefined) {
      this.updateUI();
    }

    if (this.isLoading) {
      luftiLoading = <lufti-loading class="s-loading" />
    }

    return (
      <div class={luftiContainerClass}>
        <header class="lufti-header">
          <h1 class="lufti-header__title">LUFTI
          <svg class="lufti-header-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M18.6 18.3c1.9 0 3.4-1.5 3.4-3.4 0-1.5-1-2.8-2.4-3.3-.6-3.4-3.6-6-7.2-6-2.9.1-5.4 1.7-6.6 4.1C3.7 10 2 11.8 2 14c0 2.4 1.9 4.3 4.3 4.3h12.3z" fill="none" stroke="#000" stroke-width=".8333" stroke-miterlimit="10"/>
          </svg>
          </h1>
          <lufti-legend></lufti-legend>
        </header>

        <main class="lufti-main">
          <div class={this.isLoading ? "lufti-air-component s-loading" : "lufti-air-component"}>
            {luftiValues}
          </div>
          <lufti-face id="hankMoody" mood={this.luftdaten.components.pm10 !== "0" ? parseFloat(this.luftdaten.components.pm10) : 40}></lufti-face>
          <div class="lufti-search-container">
            <lufti-search></lufti-search>
            {luftiLocation}
          </div>
          {luftiLoading}
          <a href="https://github.com/StefanKandlbinder/lufti"
            class="lufti-github"
            title="Visit Lufti on Github!"
            target="_blank"
            onClick={Ripple.showRipple}>
            <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M0 48h48V0L0 48zm39.2-5.2l-1.6-1.6c-2 3.2-4.4 1.9-4.4 1.9-1.5-.7-2.4-.3-2.4-.3-1.4.3-.5-.6-.5-.6 1-.9 2.4-.5 2.4-.5 2.3.6 3.2-1.2 3.5-2-.5-.7-.7-1.4-.7-1.9-2.3 1.9-5.3 3.2-8.9-.4-1-1-1.5-2.2-1.6-3.5-.3-.1-1.6-.8-2.4-2.6 0 0 .5-1 3.6-1.6.5-1 1.2-1.9 2-2.7.8-.8 1.7-1.5 2.7-2 .6-3 1.6-3.5 1.6-3.5 1.8.8 2.4 2.1 2.6 2.4 1.3.1 2.5.5 3.5 1.6 3.6 3.6 2.2 6.6.3 8.9.6 0 1.5.2 2.4 1.1l2.6 2.6-4.7 4.7z" fill="#fff"/>
            </svg>
          </a>
        </main>
      </div>
    );
  }
}
