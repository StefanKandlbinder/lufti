import { Component, Listen, State } from '@stencil/core';


@Component({
  tag: 'lufti-main',
  styleUrl: 'lufti-main.css',
  shadow: true
})
export class AppRoot {
  @State() componentValues: [{value: "0.00"}, {value:"0.00"}];

  @Listen('body:luftiIDSelected')
  onStockSymbolSelected(componentValues) {
      if (this.componentValues !== null) {
        this.componentValues = componentValues.detail;
      }
  }

  componentDidLoad() {
    console.log('componentDidLoad');

    this.componentValues = [{value: "0.00"}, {value:"0.00"}];
  }

  render() {
    let pm10 = "0.00";

    if (this.componentValues) {
      pm10 = this.componentValues[0].value;
    }

    return (
      <div class="lufti-container">
        <header class="lufti-header">
          <h1 class="lufti-header__title">LUFTI</h1>
        </header>

        <main class="lufti-main">
          <div class="lufti-air-component">
            <svg class="lufti-air-component-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="airSVGLuftdatenMarker"><path d="M21.5 17.5v-11L12 1 2.5 6.5v11L12 23z"></path></svg>
            <div class="lufti-air-component-value-container">
              <div class="lufti-air-component-value">{pm10}</div>
            </div>
          </div>
          <lufti-search></lufti-search>
        </main>
      </div>
    );
  }
}
