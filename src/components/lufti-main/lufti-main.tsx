import { Component, Listen, State } from '@stencil/core';
import getMood from '../../utilities/getMood';

@Component({
  tag: 'lufti-main',
  styleUrl: 'lufti-main.css',
  shadow: true
})
export class LuftiMain {
  @State() componentValues: any;
  @State() luftiID: string;
  @State() isLoading: boolean;

  @Listen('body:luftiIDSelected')
  onStockSymbolSelected(componentValues) {
    if (this.componentValues !== null) {
      this.componentValues = componentValues.detail;
    }
  }

  @Listen('body:luftiID')
  onLuftiID(luftiID) {
    if (this.luftiID !== null) {
      this.luftiID = luftiID.detail;
    }
  }

  @Listen('body:isLoading')
  onIsLoading(isLoading) {
    if (this.isLoading !== null) {
      this.isLoading = isLoading.detail;
    }
  }

  /* componentDidLoad() {
    console.log('componentDidLoad [lufti-main]');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate [lufti-main]');
  } */

  render() {
    let pm10 = "0.00";
    let pm25 = "0.00";
    let timestamp = "";

    let errorMessage = "Sry, no data here!";
    let errorEmoji = "¯\\_(ツ)_/¯";

    if (this.componentValues) {
      pm10 = this.componentValues.pm10;
      pm25 = this.componentValues.pm25;
      timestamp = this.componentValues.timestamp;

      document.documentElement.style.setProperty('--lufti-color-primary', getMood(pm10, "0.8"));
      document.documentElement.style.setProperty('--lufti-color-primary--dark', getMood(pm10, "0.85"));
      document.documentElement.style.setProperty('--lufti-color-primary--darker', getMood(pm10, "0.9"));
      document.documentElement.style.setProperty('--lufti-color-primary--weaker', getMood(pm10, "0.5"));

    }

    let luftiContainerClass = "lufti-container";

    if (this.luftiID === undefined) {
      luftiContainerClass += " lufti-container--initial";
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
            <div class="lufti-air-component-value-container">
              <div class="lufti-air-component-value lufti-air-component-value--pm10">{pm10 !== "0" ? pm10 : errorEmoji}</div>
              <div class="lufti-air-component-value lufti-air-component-value--pm25">{pm25 !== "0" ? pm25 : errorMessage}</div>
            </div>
          </div>
          <div class="lufti-search-container">
            <lufti-search></lufti-search>
            <div class={this.isLoading ? "lufti-timestamp s-loading" : "lufti-timestamp"}>{timestamp}</div>
          </div>
          <lufti-loading class={this.isLoading ? "s-loading" : ""}></lufti-loading>
          <a href="https://github.com/StefanKandlbinder/lufti" class="lufti-github">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M0 48h48V0L0 48zm39.2-5.2l-1.6-1.6c-2 3.2-4.4 1.9-4.4 1.9-1.5-.7-2.4-.3-2.4-.3-1.4.3-.5-.6-.5-.6 1-.9 2.4-.5 2.4-.5 2.3.6 3.2-1.2 3.5-2-.5-.7-.7-1.4-.7-1.9-2.3 1.9-5.3 3.2-8.9-.4-1-1-1.5-2.2-1.6-3.5-.3-.1-1.6-.8-2.4-2.6 0 0 .5-1 3.6-1.6.5-1 1.2-1.9 2-2.7.8-.8 1.7-1.5 2.7-2 .6-3 1.6-3.5 1.6-3.5 1.8.8 2.4 2.1 2.6 2.4 1.3.1 2.5.5 3.5 1.6 3.6 3.6 2.2 6.6.3 8.9.6 0 1.5.2 2.4 1.1l2.6 2.6-4.7 4.7z" fill="#fff"/>
            </svg>
          </a>
        </main>
      </div>
    );
  }
}
