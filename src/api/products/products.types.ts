export interface Product {
    id: number,
    title: string,
    price:string,
    category:string,
    description:string,
    image:string,
}

export interface ProductsQueryParams {
    offset: number
    limit: number
    search: string
}