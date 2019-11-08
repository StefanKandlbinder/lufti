import { EventEmitter } from '@stencil/core';
import { Luftdaten } from '../../models/luftdaten/luftdaten';
export declare class LuftiSearch {
    luftiInput: HTMLInputElement;
    sensorIDInput: string;
    sensorIDInputValid: boolean;
    loading: boolean;
    luftdaten: EventEmitter<Luftdaten>;
    luftiID: EventEmitter<string>;
    isLoading: EventEmitter<boolean>;
    /**
     * If a station ID is defined in Local Storage fetch the new data
     */
    componentDidLoad(): void;
    componentDidUnload(): void;
    componentWillUpdate(): void;
    /**
     * Fetch new data when the tab gets active again
     */
    handleVisibilityChange(): void;
    onUserInput(event: Event): void;
    /**
     * send a reuest and if the respond is fine emit a new Luftdaten object
     */
    fetchData(): void;
    /**
     * persist the sensor ID and then fetch the data
     * @param event the submit event handler
     */
    onGetData(event: Event): void;
    render(): any;
}
