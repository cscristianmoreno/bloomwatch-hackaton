export type SubsetTypeStruct = {
    xllcorner: number,
    yllcorner: number,
    cellsize: number,
    nrows: number,
    ncols: number,
    band: string,
    latitude: number,
    longitude: number,
    header: number,
    subset: SubsetChildrenTypeStruct[]
};

export type SubsetChildrenTypeStruct = {
    modis_date: string,
    calendar_date: string,
    band: string,
    tile: string,
    proc_date: number,
    data: number[]
};