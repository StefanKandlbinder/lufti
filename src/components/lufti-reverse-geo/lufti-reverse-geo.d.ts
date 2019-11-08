export declare class LuftiReverseGeo {
    location: {
        latitude: string;
        longitude: string;
    };
    validateName(newValue: {
        latitude: string;
        longitude: string;
    }, oldValue: {
        latitude: string;
        longitude: string;
    }): void;
    reverseGeoToken: {
        token: "";
        expires: number;
        timestamp: number;
    };
    reverseGeoData: {
        address: any;
    };
    loading: boolean;
    hostData(): {
        'class': {
            's-loading': boolean;
        };
    };
    /**
     * fetch a valid ARCGIS token
     */
    componentDidLoad(): void;
    getToken(): void;
    getReverseGeo(token: any): void;
    render(): any[];
}
