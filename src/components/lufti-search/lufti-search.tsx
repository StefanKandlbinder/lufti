import { Component, State, EventEmitter, Event } from '@stencil/core';


@Component({
    tag: 'lufti-search',
    styleUrl: 'lufti-search.css',
    shadow: true
})
export class AppRoot {
    luftiInput: HTMLInputElement;

    @State() componentValues: [];
    @State() sensorIDInput: string;
    @State() sensorIDInputValid = false;
    @State() loading = false;

    @Event({ bubbles: true, composed: true }) luftiIDSelected: EventEmitter<[]>;

    onUserInput(event: Event) {
        this.sensorIDInput = (event.target as HTMLInputElement).value;

        if (this.sensorIDInput.trim().length > 0) {
            this.sensorIDInputValid = true;
        }
        else {
            this.sensorIDInputValid = false;
        }
    }

    onGetData(event: Event) {
        event.preventDefault();
        const luftiID = this.luftiInput.value;

        this.loading = true;

        fetch(`http://api.luftdaten.info/v1/sensor/${luftiID}/`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Invalid!');
                }
                return res.json();
            })
            .then(parsedRes => {
                /* if (!parsedRes['bestMatches']) {
                    throw new Error('Invalid Symbol');
                }  */

                /* this.componentValues = parsedRes['bestMatches'].map(match => {
                    return { name: match['2. name'], symbol: match['1. symbol'] }
                }); */

                this.componentValues = parsedRes[1].sensordatavalues

                this.luftiIDSelected.emit(this.componentValues);

                // console.log(this.componentValues[0].value);

                this.loading = false;
                // this.error = '';
            })
            .catch(err => {
                this.loading = false;
                // this.error = err.message;
                console.log(err);
            });
    }

    render() {
        let luftiSearchFormClass = "lufti-search-form";
        if (this.sensorIDInputValid) {
            luftiSearchFormClass += " lufti-search-form--raised";
        }

        return (
            <form class={luftiSearchFormClass} onSubmit={this.onGetData.bind(this)}>
                <div class="lufti-loading"></div>
                <div class="lufti-search">
                    <input 
                        id="lufti-id"
                        type="number"
                        class="lufti-search-input"
                        autoComplete="off"
                        ref={el => this.luftiInput = el}
                        onInput={this.onUserInput.bind(this)}
                        placeholder="your sensor id" />
                </div>
                <button 
                    class="lufti-search-button" 
                    disabled={!this.sensorIDInputValid || this.loading}
                    type="submit">GO!</button>
            </form>
        );
    }
}