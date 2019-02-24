import { Component, Listen, State } from '@stencil/core';


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

  componentDidLoad() {
    console.log('componentDidLoad [lufti-main]');
    // this.componentValues = [{value: "0.00"}, {value:"0.00"}, {timestamp:""}];
  }

  componentDidUpdate() {
    console.log('componentDidUpdate [lufti-main]');
  }

  render() {
    let pm10 = "0.00";
    let pm25 = "0.00";

    if (this.componentValues) {
      pm10 = this.componentValues.pm10;
      pm25 = this.componentValues.pm25;
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
        </header>

        <main class="lufti-main">
          <div class={this.isLoading ? "lufti-air-component s-loading" : "lufti-air-component"}>
            <div class="lufti-air-component-value-container">
              <div class="lufti-air-component-value lufti-air-component-value--pm10">{pm10}</div>
              <div class="lufti-air-component-value lufti-air-component-value--pm25">{pm25}</div>
            </div>
          </div>
          <lufti-search></lufti-search>
          <lufti-loading class={this.isLoading ? "s-loading" : ""}></lufti-loading>
        </main>
      </div>
    );
  }
}
