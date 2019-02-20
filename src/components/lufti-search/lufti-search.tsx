import { Component, State, Prop, Watch } from '@stencil/core';


@Component({
    tag: 'lufti-search',
    styleUrl: 'lufti-search.css',
    shadow: true
})
export class AppRoot {
    @State() loading = false;
    @State() luftiInput = null;
    @State() luftiInputValid = false;
    @State() error: string;

    @Prop({mutable: true, reflectToAttr: true}) luftiID: number;

    @Watch('luftiID')
    stockSymbolChanged(newValue: number, oldValue: number) {
        console.log("CHANGED");

        if (newValue !== oldValue) {
            this.luftiInput = newValue;
            this.luftiInputValid = true;
            this.fetchData(newValue);
        }
    }

    onFetchID(event: Event) {
        event.preventDefault();
        this.luftiID = this.luftiInput.value;
    }

    onUserInput(event: Event) {
        this.luftiInput = (event.target as HTMLInputElement).value;

        if (this.luftiInput.trim().length > 0) {
            this.luftiInputValid = true;
        }
        else {
            this.luftiInputValid = false;
        }
    }

    componentDidLoad() {
        console.log('componentDidLoad');

        if (this.luftiID) {
            // this.initialStockSymbol = this.stockSymbol;
            this.luftiInput = this.luftiID;
            this.luftiInputValid = true;
            this.fetchData(this.luftiID);
        }
    }

    fetchData(luftiID: number) {
        this.loading = true;

        fetch(`http://api.luftdaten.info/v1/sensor/6555/${luftiID}`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Invalid!');
                }
                return res.json();
            })
            .then(parsedRes => {
                if (!parsedRes['Global Quote']['05. price']) {
                    throw new Error('Invalid Symbol');
                }
                this.loading = false;
                this.error = '';
                // this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
            })
            .catch(err => {
                this.error = err.message;
                // this.fetchedPrice = null;
                this.loading = false;
            });
    }

    render() {
        return (
            <form onSubmit={this.onFetchID.bind(this)}>
                <div class="lufti-search">
                    <input 
                        id="lufti-id"
                        class="lufti-search-input"
                        autoComplete="off"
                        value={this.luftiInput}
                        onInput={this.onUserInput.bind(this)}
                        placeholder="your sensor id" />
                </div>
                <button
                    type="submit"
                    disabled={!this.luftiInputValid || this.loading}>Fetch</button>
            </form>
            
        );
    }
}
