import type { DateTypeStruct } from "../types/date.type";
import type { ProductsTypeStruct, ProductTypeStruct } from "../types/products.type";
import type { SitesTypeStruct } from "../types/sites.type";
import type { SubsetTypeStruct } from "../types/subset.type";

export interface IModislService  {
    getAllProducts(): Promise<ProductsTypeStruct>,

    getAllSites(): Promise<SitesTypeStruct>,

    getSubset(lat: number, lon: number, date: DateTypeStruct): Promise<SubsetTypeStruct>,

    getAllSubset(startDate: string, endDate: string): Promise<SubsetTypeStruct[]>
};  