import { useEffect, useState } from "react";
import type { SitesTypeStruct, SiteTypeStruct } from "../types/sites.type";
import { http } from "../api/api.service";
import { ModisService } from "../services/modis.service";
import type { SubsetTypeStruct } from "../types/subset.type";
import type { DateTypeStruct } from "../types/date.type";

export const useFind = () => {
    const [sites, setSites] = useState<SitesTypeStruct | null>(null);
    const [subset, setSubset] = useState<SubsetTypeStruct[] | null>([]);

    const modisService: ModisService = new ModisService();

    const getAllSites = async (): Promise<void> => {
        const result: SitesTypeStruct = await modisService.getAllSites();
        setSites(result);
    };

    const getAllSubset = async (): Promise<SubsetTypeStruct[]> => {
        const result: SubsetTypeStruct[] = await modisService.getAllSubset();
        return result;
    };

    const getSubset = async (lat: number, lon: number, date: DateTypeStruct): Promise<SubsetTypeStruct> => {
        const result: SubsetTypeStruct = await modisService.getSubset(lat, lon, date);
        return result;
    };

    useEffect((): void => {
        getAllSites();
    }, []);

    return {
        sites,
        subset,
        getAllSubset,
        getAllSites,
        getSubset
    };
};