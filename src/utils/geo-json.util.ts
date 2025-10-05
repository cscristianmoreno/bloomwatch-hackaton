import axios, { type AxiosResponse } from "axios";
import type { GeoJSONTypeStruct } from "../types/geo-json.type";
import L, { GeoJSON as LeafletGeoJson, Map, type GeoJSONOptions } from "leaflet";
import type { GeoJSON as GeoJson } from "geojson";

export abstract class GeoJsonUtil {

    public static async load(): Promise<GeoJSONTypeStruct> {
        const result: AxiosResponse<GeoJSONTypeStruct> = await axios<GeoJSONTypeStruct>(`/geo-json/bloomwatch.json`);
        return result.data;
    }

    /** Añadir GeoJSON a Leaflet */
    public static addToMap(result: GeoJSONTypeStruct, map: Map, options?: GeoJSONOptions): LeafletGeoJson {
        const LeafletGeoJson: LeafletGeoJson = L.geoJSON(result as GeoJson, options);
        LeafletGeoJson.addTo(map);
        return LeafletGeoJson;
    }
}