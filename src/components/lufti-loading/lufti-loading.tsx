import { Component } from '@stencil/core';


@Component({
  tag: 'lufti-loading',
  styleUrl: 'lufti-loading.css',
  shadow: false
})
export class LuftiLoading {

  componentDidLoad() {
    console.log('componentDidLoad [lufti-main]');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate [lufti-main]');
  }

  render() {
    return (
      <svg class="lufti-loading-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M18.6 18.3c1.9 0 3.4-1.5 3.4-3.4 0-1.5-1-2.8-2.4-3.3-.6-3.4-3.6-6-7.2-6-2.9.1-5.4 1.7-6.6 4.1C3.7 10 2 11.8 2 14c0 2.4 1.9 4.3 4.3 4.3h12.3z" fill="none" stroke="#000" stroke-width=".8333" stroke-miterlimit="10"/>
      </svg>
    );
  }
}
