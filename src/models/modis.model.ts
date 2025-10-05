import type { DateTypeStruct, SliderDateTypeStruct } from "../types/date.type";
import type { ProductsTypeStruct, ProductTypeStruct } from "../types/products.type";
import type { SitesTypeStruct } from "../types/sites.type";
import type { SubsetTypeStruct } from "../types/subset.type";

export interface IModislService  {
    getAllProducts(): Promise<ProductsTypeStruct>,

    getAllSites(): Promise<SitesTypeStruct>,

    getAllDatesByCoords(lat: number, lon: number): Promise<DateTypeStruct>,

    getSubset(lat: number, lon: number, date: string, km: number): Promise<SubsetTypeStruct>,

    getAllSubset(startDate: string, endDate: string): Promise<SubsetTypeStruct[]>
};  