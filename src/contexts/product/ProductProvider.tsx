import { useEffect, useState, type FC, type PropsWithChildren } from 'react'
import ProductsContext, { type IProductsContext } from './ProductContext'
import { getProducts } from '../../api/products/products';

const ProductProvider: FC<PropsWithChildren> = ({ children }) => {
	const [productsForOrder, setProductsForOrder] = useState<IProductsContext['productsForOrder']>({});
	const [products, setProducts] = useState<IProductsContext['products']>({});
	const setProductsAmountForOrderById: IProductsContext['setProductsAmountForOrderById'] = (id, amount = () => 0) => {
		if (!products[id]) {
			throw new Error(`Product doesn't exist`)
		}
		const newAmount = amount(productsForOrder[id] || 0);
		setProductsForOrder((productsForOrder) => {
			if (newAmount <= 0) {
				delete productsForOrder[id];
				return {
					...productsForOrder
				}
			} else {
				return {
				...productsForOrder,
				[id]: newAmount
			}
			}
		})
	}
	useEffect(() => {
		const initProducts = async () => {
			const products = await getProducts();
			setProducts(
				products.reduce<IProductsContext['products']>((productMap, product) => {
					productMap[product.id] = product
					return productMap
				}, {})
			);
		}
		initProducts();
	}, [])
	return (
		<ProductsContext
			value={{
				products,
				productsForOrder,
				setProductsForOrder: (productsForOrder) => setProductsForOrder({...productsForOrder}),
				setProductsAmountForOrderById,
				setProducts: (products) => setProducts({...products}),
			}}
		>
			{children}
		</ProductsContext>
	)
}

export default ProductProvider