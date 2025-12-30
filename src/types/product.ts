export interface IProductResp {
	products: IProduct[]
}

export interface IProduct {
	"id": string
	"title": string
	"description": string
	"price": number
	"url": string
}