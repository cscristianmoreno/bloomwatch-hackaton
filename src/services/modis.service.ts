import type { AxiosResponse } from "axios";
import { http } from "../api/api.service";
import type { IModislService } from "../models/modis.model";
import type { ProductsTypeStruct, ProductTypeStruct } from "../types/products.type";
import type { SitesTypeStruct, SiteTypeStruct } from "../types/sites.type";
import type { SubsetTypeStruct } from "../types/subset.type";
import type { DateTypeStruct, SliderDateTypeStruct } from "../types/date.type";

export class ModisService implements IModislService {
    async getAllProducts(): Promise<ProductsTypeStruct> {
        const result: AxiosResponse<ProductsTypeStruct> = await http.get("/products");
        return result.data;
    }

    async getAllSites(): Promise<SitesTypeStruct> {
        const result: AxiosResponse<SitesTypeStruct> = await http.get("/sites");
        return result.data;
    }

    async getAllDatesByCoords(lat: number, lon: number): Promise<DateTypeStruct> {
        const result: AxiosResponse<DateTypeStruct> = await http.get("/MOD13Q1/dates", {
            params: {
                latitude: lat,
                longitude: lon
            }
        });

        return result.data;
    }

    async getSubset(lat: number, lon: number, date: string, km: number): Promise<SubsetTypeStruct> {
         const result: AxiosResponse<SubsetTypeStruct> = await http.get("/MOD13Q1/subset", {
            params: {
                latitude: lat,
                longitude: lon,
                startDate: date,
                endDate: date,
                kmAboveBelow: km,
                kmLeftRight: km
            }
        });

        return result.data;
    }

    async getAllSubset(): Promise<SubsetTypeStruct[]> {
        // const sites: SitesTypeStruct = await this.getAllSites();

        // const subset: SubsetTypeStruct[] = await new Promise((resolve): void => {

        //     const items: SubsetTypeStruct[] = [];

        //     sites.sites.map(async (site: SiteTypeStruct): Promise<void> => {
        //         const result: AxiosResponse<SubsetTypeStruct> = await http.get("/MOD13Q1/subset", {
        //             params: {
        //                 latitude: site.latitude,
        //                 longitude: site.longitude,
        //                 startDate: startDate,
        //                 endDate: endDate,
        //                 kmAboveBelow: 5,
        //                 kmLeftRight: 5
        //             }
        //         })

        //         items.push(result.data);
        //     });

        //     resolve(items);
        // });

        return [];
    }
}