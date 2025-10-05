export type ProductsTypeStruct = {
    products: ProductTypeStruct[]
};

export type ProductTypeStruct = {
    product: string,
    description: string,
    frequency: string,
    resolution_meters: number
};