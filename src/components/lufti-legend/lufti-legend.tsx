import { Component } from '@stencil/core';


@Component({
  tag: 'lufti-legend',
  styleUrl: 'lufti-legend.css',
  shadow: false
})
export class LuftiLegend {
  render() {
    return (
      <div class="lufti-legend lufti-legend--horizontal">
        <div class="lufti-legend-scale">
          <div class="lufti-legend-scale-stop lufti-legend-scale-stop--0">
            <div class="lufti-legend-scale-stop-label">0 µg/m³</div>
          </div>
          <div class="lufti-legend-scale-stop lufti-legend-scale-stop--1">
            <div class="lufti-legend-scale-stop-label">25</div>
          </div>
          <div class="lufti-legend-scale-stop lufti-legend-scale-stop--2 lufti-legend-scale--limit">
              <div class="lufti-legend-scale-stop-label lufti-legend-scale--limit-text">50 PM10</div>
          </div>
          <div class="lufti-legend-scale-stop lufti-legend-scale-stop--3">
            <div class="lufti-legend-scale-stop-label">75</div>
          </div>
          <div class="lufti-legend-scale-stop lufti-legend-scale-stop--4">
            <div class="lufti-legend-scale-stop-label">100</div>
          </div>
          <div class="lufti-legend-scale-stop lufti-legend-scale-stop--5">
            <div class="lufti-legend-scale-stop-label">500</div>
          </div>
        </div>
      </div>
    );
  }
}
