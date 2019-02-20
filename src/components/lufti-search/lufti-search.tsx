import { Component, State, EventEmitter, Event } from '@stencil/core';


@Component({
    tag: 'lufti-search',
    styleUrl: 'lufti-search.css',
    shadow: true
})
export class AppRoot {
    luftiInput: HTMLInputElement;

    @State() searchResults: { symbol: string, name: string }[] = [];
    @State() loading = false;

    @Event({ bubbles: true, composed: true }) luftiIDSelected: EventEmitter<string>;

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
                }

                this.searchResults = parsedRes['bestMatches'].map(match => {
                    return { name: match['2. name'], symbol: match['1. symbol'] }
                }); */
                console.log(parsedRes);

                this.loading = false;
                // this.error = '';
            })
            .catch(err => {
                this.loading = false;
                // this.error = err.message;
                console.log(err);
            });
    }

    onSelectSymbol(symbol: string) {
        this.luftiIDSelected.emit(symbol);
    }

    render() {
        return (
            <form onSubmit={this.onGetData.bind(this)}>
                <div class="lufti-search">
                    <input 
                        id="lufti-id"
                        class="lufti-search-input"
                        autoComplete="off"
                        ref={el => this.luftiInput = el}
                        placeholder="your sensor id" />
                </div>
                <button
                    type="submit">Fetch</button>
            </form>
        );
    }
}
