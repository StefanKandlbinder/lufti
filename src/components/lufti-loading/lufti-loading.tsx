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
        <path class="lufti-loading-icon-path" d="M3 18.5h18.7c.8-.7 1.3-1.7 1.3-2.9 0-1.7-1.1-3.1-2.7-3.6-.7-3.8-4-6.6-7.9-6.6-3.2 0-5.9 1.8-7.2 4.5-2.4.4-4.2 2.4-4.2 4.8 0 1.6.8 3 2 3.8z" fill="none" stroke="#000" stroke-miterlimit="10" />
      </svg>
    );
  }
}
