export declare class Luftdaten {
    components: {
        pm10: string;
        pm25: string;
    };
    location: {
        longitude: string;
        latitude: string;
    };
    timestamp: string;
    constructor(components: {
        pm10: string;
        pm25: string;
    }, location: {
        longitude: string;
        latitude: string;
    }, timestamp: string);
}
