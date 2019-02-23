import { Component, Listen, State } from '@stencil/core';


@Component({
  tag: 'lufti-main',
  styleUrl: 'lufti-main.css',
  shadow: true
})
export class AppRoot {
  @State() componentValues: any;
  @State() luftiID: string;

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
          <h1 class="lufti-header__title">LUFTI <svg class="lufti-header-logo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z" /></svg></h1>
        </header>

        <main class="lufti-main">
          <div class="lufti-air-component">
            <div class="lufti-air-component-value-container">
              <div class="lufti-air-component-value lufti-air-component-value--pm10">{pm10}</div>
              <div class="lufti-air-component-value lufti-air-component-value--pm25">{pm25}</div>
            </div>
          </div>
          <lufti-search></lufti-search>
        </main>
      </div>
    );
  }
}
