import { Component, State, EventEmitter, Event } from '@stencil/core';
import { saveState, loadState } from '../../store/localStorage';

@Component({
  tag: 'lufti-search',
  styleUrl: 'lufti-search.css',
  shadow: true
})
export class LuftiSearch {
  luftiInput: HTMLInputElement;

  @State() sensorIDInput: string;
  @State() sensorIDInputValid = false;
  @State() loading = false;

  @Event({ bubbles: true, composed: true }) luftiIDSelected: EventEmitter<{}>;
  @Event({ bubbles: true, composed: true }) luftiID: EventEmitter<string>;
  @Event({ bubbles: true, composed: true }) isLoading: EventEmitter<boolean>;

  componentDidLoad() {
    // console.log("componentDidLoad [lufti-search]");

    const persistedState = loadState();

    if (persistedState !== undefined) {
      this.sensorIDInputValid = true;
      this.luftiInput.value = persistedState.stationID;
      this.luftiID.emit(persistedState.stationID);

      this.fetchData();

      document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this), false);
    }
  }

  componentDidUnload() {
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  }

  componentWillUpdate() {
    // console.log("componentWillUpdate [lufti-search]");

    const persistedState = loadState();

    if (persistedState !== undefined) {
      this.luftiID.emit(persistedState.stationID);
    }
  }

  /**
   * Fetch new data when the tan gets active again
   */
  handleVisibilityChange() {
    if (document.hidden) {
      // pauseSimulation();
    } 
    else  {
      this.fetchData();
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

  fetchData() {
    this.sensorIDInput = this.luftiInput.value;
    this.loading = true;
    this.isLoading.emit(true);
    
    let errorMessage = "Sry, no data here!";
    let errorEmoji = "¯\\_(ツ)_/¯";

    fetch(`https://api.luftdaten.info/v1/sensor/${this.sensorIDInput}/`)
      .then(res => {
        if (res.status !== 200) {
          this.luftiIDSelected.emit({ "pm10": errorEmoji,
            "pm25": errorMessage,
            "timestamp": ""});

          this.loading = false;
          this.isLoading.emit(false);

          throw new Error('Invalid!');
        }
        return res.json();
      })
      .then(parsedRes => {
        this.luftiIDSelected.emit({ "pm10": parsedRes[parsedRes.length - 1].sensordatavalues[0].value,
          "pm25": parsedRes[parsedRes.length - 1].sensordatavalues[1].value,
          "timestamp": parsedRes[parsedRes.length - 1].timestamp });

        this.loading = false;
        this.isLoading.emit(false);
      })
      .catch(err => {
        this.luftiIDSelected.emit({ "pm10": errorEmoji,
          "pm25": errorMessage,
          "timestamp": ""});

        this.loading = false;
        this.isLoading.emit(false);
        console.log(err);
      });
  }

  onGetData(event: Event) {
    event.preventDefault();

    saveState({
      stationID: this.sensorIDInput
    });

    this.fetchData();
  }

  render() {
    let luftiSearchFormClass = "lufti-search-form";

    if (this.sensorIDInputValid) {
      luftiSearchFormClass += " lufti-search-form--raised";
    }

    return (
      <form
        aria-label="Sensor ID Form"
        class={luftiSearchFormClass}
        onSubmit={this.onGetData.bind(this)}>
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
            placeholder="your sensor id" />
        </div>
        <button
          aria-label="Search Button"
          class="lufti-search-button"
          disabled={!this.sensorIDInputValid || this.loading}
          type="submit"><svg class="lufti-search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg></button>
      </form>
    );
  }
}
