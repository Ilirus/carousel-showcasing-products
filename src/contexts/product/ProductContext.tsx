import { createContext } from 'react'
import type { IProduct } from '../../types/product';
import { stub } from '../../utils/common/common';

export interface IProductsContext {
	products: Record<IProduct['id'], IProduct>
	productsForOrder: Record<string, number>
	setProductsForOrder: (productsForOrder: IProductsContext['productsForOrder']) => void
	setProductsAmountForOrderById: (id: string, amount?: (curAmount: number) => number) => void
	setProducts: (products: IProductsContext['products']) => void
}

const ProductsContext = createContext<IProductsContext>({
	products: {},
	productsForOrder: {},
	setProductsForOrder: stub,
	setProductsAmountForOrderById: stub,
	setProducts: stub
});

export default ProductsContext;