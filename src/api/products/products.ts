import type { IProduct, IProductResp } from "../../types/product";

export const getProducts = async (): Promise<IProduct[]> => {
	const resp = await fetch('./products.json');
	if (resp.ok) {
		const {products}: IProductResp = await resp.json();
		return products;
	} else {
		throw new Error(`${resp.status}: ${resp.statusText}`)
	}
}