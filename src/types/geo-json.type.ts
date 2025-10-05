export type GeoJSONTypeStruct = {
    type: string;
    features: {
        type: string;
        geometry: {
            type: string;
            coordinates: number[][][];
        };
        properties: {
            Area: string;
            Season: string;
            Site: string;
            Type: string;
            id: number | null;
        };
    }[];
};