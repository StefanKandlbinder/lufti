import { Component, State, EventEmitter, Event, h } from '@stencil/core';
import { saveState, loadState } from '../../store/localStorage';
import Visibility from 'visibilityjs';

import luftdatenJsonTransformer from '../../models/luftdaten/luftdatenJsonTransformer';
import { Luftdaten } from '../../models/luftdaten/luftdaten';
import { DataService } from '../../services/getStation';
import { Ripple } from '../../utilities/Rippler';

@Component({
  tag: 'lufti-search',
  styleUrl: 'lufti-search.css',
  shadow: true
})
export class LuftiSearch {
  raf = null;
  duration: number = 280;
  visibility;
  luftiInput: HTMLInputElement;

  @State() sensorIDInput: string;
  @State() sensorIDInputValid = false;
  @State() loading = false;
  @State() animating = false;
  @State() turbulence = 0;

  @Event({ bubbles: true, composed: true }) luftdaten: EventEmitter<Luftdaten>;
  @Event({ bubbles: true, composed: true }) luftiID: EventEmitter<string>;
  @Event({ bubbles: true, composed: true }) isLoading: EventEmitter<boolean>;

  /**
   * If a station ID is defined in Local Storage fetch the new data
   */
  componentDidLoad() {
    const persistedState = loadState();

    if (persistedState !== undefined) {
      this.sensorIDInputValid = true;
      this.luftiInput.value = persistedState.stationID;
      this.luftiID.emit(persistedState.stationID);

      this.fetchData();

      this.visibility = Visibility.change(() => {
        if ( !Visibility.hidden() ) {
           this.fetchData();
        }
      });
    }
  }

  componentWillUpdate() {
    const persistedState = loadState();

    if (persistedState !== undefined) {
      this.luftiID.emit(persistedState.stationID);
    }
  }

  onUserInput(event: Event) {
    this.sensorIDInput = (event.target as HTMLInputElement).value;

    if (this.sensorIDInput.trim().length > 0) {
      this.sensorIDInputValid = true;
    }
    else {
      this.sensorIDInputValid = false;
    }
  }

  /**
   * send a reuest and if the respond is fine emit a new Luftdaten object
   */
  fetchData() {
    this.sensorIDInput = this.luftiInput.value;
    this.loading = true;
    this.isLoading.emit(true);

    DataService.getData()
      .then(response => {
        this.loading = false;
        this.isLoading.emit(false);

        let station = response.filter(station => {
          return station.sensor.id.toString() === this.sensorIDInput
        })

        this.luftdaten.emit(luftdatenJsonTransformer(station));
      })
      .catch(function (error) {
        // handle error
        this.luftdaten
          .emit(null);

        this.loading = false;
        this.isLoading.emit(false);

        console.log(error);
      })
  }

  /**
   * persist the sensor ID and then fetch the data
   * @param event the submit event handler
   */
  onGetData(event: Event) {
    event.preventDefault();
    // this.animate();

    saveState({
      stationID: this.sensorIDInput
    });

    this.fetchData();
  }

  animate() {
    this.animating = true;
		window.cancelAnimationFrame(this.raf);

		const time = {
			start: performance.now(),
      total: this.duration,
      elapsed: 0
    }

		let step = now => {
			time.elapsed = now - time.start;
			let progress = time.elapsed / time.total;

			if (progress <= 1.1) {
        this.raf = window.requestAnimationFrame(step);
        this.turbulence = this.mapTo(progress, 0, 1, 0, 0.08)
			}
			else {
        window.cancelAnimationFrame(this.raf);
        this.animating = false;
			}
		}

		this.raf = window.requestAnimationFrame(step);
  }

  mapTo(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  render() {
    let luftiSearchFormClass = "lufti-search-form";
    let filter = null;

    if (this.sensorIDInputValid) {
      luftiSearchFormClass += " lufti-search-form--raised";
    }

    if (this.animating) {
      filter={filter: "url(#filter-glitch-1)"};
    }

    return (
      <form
        aria-label="Sensor ID Form"
        class={luftiSearchFormClass}
        onSubmit={this.onGetData.bind(this)}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="lufti-search-svg-filter">
          <defs>
            <filter id="filter-glitch-1">
              <feTurbulence type="fractalNoise" baseFrequency={this.turbulence} numOctaves="1" result="warp"></feTurbulence>
              <feOffset dx="0" dy="0" result="warpOffset"></feOffset>
              <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warpOffset"></feDisplacementMap>
            </filter>
          </defs>
        </svg>
        <div class="lufti-search-button-spacer"></div>
        <div class="lufti-search">
          <input
            aria-label="Sensor ID Input"
            id="lufti-id"
            type="number"
            step="1"
            inputmode="numeric"
            pattern="[0-9]*"
            class="lufti-search-input"
            autoComplete="off"
            ref={el => this.luftiInput = el}
            onInput={this.onUserInput.bind(this)}
            placeholder="your sensor id"
            style={filter} />
        </div>
        <button
          aria-label="Search Button"
          id="lufti-search-submit"
          class="lufti-search-button"
          disabled={!this.sensorIDInputValid || this.loading}
          type="submit"
          onClick={Ripple.showRipple}
          style={filter}>
          <svg
            class="lufti-search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z" /><path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
      </form>
    );
  }
}
