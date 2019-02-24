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

    console.log(this.isLoading);
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
            <path d="M3 18.5h18.7c.8-.7 1.3-1.7 1.3-2.9 0-1.7-1.1-3.1-2.7-3.6-.7-3.8-4-6.6-7.9-6.6-3.2 0-5.9 1.8-7.2 4.5-2.4.4-4.2 2.4-4.2 4.8 0 1.6.8 3 2 3.8z" fill="none" stroke="#000" stroke-miterlimit="10"/>
          </svg>
          </h1>
        </header>

        <main class="lufti-main">
          <div class="lufti-air-component">
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
