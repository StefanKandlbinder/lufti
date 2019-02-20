import { Component } from '@stencil/core';


@Component({
  tag: 'lufti-main',
  styleUrl: 'lufti-main.css',
  shadow: true
})
export class AppRoot {

  render() {
    return (
      <div class="lufti-container">
        <header class="lufti-header">
          <h1 class="lufti-header__title">LUFTI</h1>
        </header>

        <main class="lufti-main">
          <div class="lufti-air-component">
            <svg class="lufti-air-component-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="airSVGLuftdatenMarker"><path d="M21.5 17.5v-11L12 1 2.5 6.5v11L12 23z"></path></svg>
            <div class="lufti-air-component-value-container">
              <div class="lufti-air-component-value">02,00</div>
            </div>
          </div>
          <lufti-search></lufti-search>
        </main>
      </div>
    );
  }
}
