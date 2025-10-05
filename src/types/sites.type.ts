export type SitesTypeStruct = {
    sites: SiteTypeStruct[]
};

export type SiteTypeStruct = {
    siteid: string,
    sitename: string,
    network: string,
    latitude: number,
    longitude: number,
    state: string,
    country: string
};