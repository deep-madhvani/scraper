export interface IQuery {
    input: {
        keyword: string,
    },
    products: IProduct[]
}

export interface IProduct {
    title: string,
    url: string,
    price: number,
    image: string,
    competitor: string
}