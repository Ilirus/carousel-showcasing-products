export interface ProductResp {
    products: Product[]
}

export interface Product {
    'id': string
    'title': string
    'description': string
    'price': number
    'url': string
}
