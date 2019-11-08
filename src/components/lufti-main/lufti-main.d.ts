import { Luftdaten } from '../../models/luftdaten/luftdaten';
export declare class LuftiMain {
    errorMessage: string;
    errorEmoji: string;
    luftdaten: Luftdaten;
    luftiID: string;
    isLoading: boolean;
    onLuftdatenEmitted(luftdaten: any): void;
    onLuftiID(luftiID: any): void;
    onIsLoading(isLoading: any): void;
    /**
     * change the theme color depending on the incoming pm10 value
     */
    updateUI(): void;
    render(): any;
}
