import { getProducts } from '@api/products/products'
import { useCallback, useEffect, useState, type FC, type PropsWithChildren } from 'react'

import ProductsContext, { type ProductsContextType } from './ProductsContext'

const ProductProvider: FC<PropsWithChildren> = ({ children }) => {
    const [
        productsForOrder,
        setProductsForOrder,
    ] = useState<ProductsContextType['productsForOrder']>({})
    const [
        products,
        setProducts,
    ] = useState<ProductsContextType['products']>({})
    const [
        isProductsLoading,
        setIsProductsLoading,
    ] = useState<ProductsContextType['isProductsLoading']>(false)
    const setProductsAmountForOrderById: ProductsContextType['setProductsAmountForOrderById'] = (id, amount = () => 0) => {
        if (!products[id]) {
            throw new Error('Product doesn\'t exist')
        }
        setProductsForOrder((state) => {
            const newAmount = amount(state[id] || 0)
            if (newAmount <= 0) {
                return {
                    ...Object.fromEntries(Object.entries(state).filter(([key]) => key !== id)),
                }
            } else {
                return {
                    ...state,
                    [id]: newAmount,
                }
            }
        })
    }
    const initProducts = useCallback(async () => {
        try {
            setIsProductsLoading(true)
            const products = await getProducts()
            setProducts(
                products.sort(() => Math.random() - 0.5).reduce<ProductsContextType['products']>((productMap, product) => {
                    productMap[product.id] = product
                    return productMap
                }, {})
            )
        } finally {
            setIsProductsLoading(false)
        }
    }, [])

    useEffect(() => {
        initProducts()
    }, [initProducts])

    return (
        <ProductsContext
            value={{
                products,
                productsForOrder,
                initProducts,
                isProductsLoading,
                setProductsForOrder: (productsForOrder) => setProductsForOrder({ ...productsForOrder }),
                setProductsAmountForOrderById,
                setProducts: (products) => setProducts({ ...products }),
            }}
        >
            {children}
        </ProductsContext>
    )
}

export default ProductProvider
