import { type Product } from '@app-types/product'
import { stub } from '@utils/common/common'
import { createContext } from 'react'

export interface ProductsContextType {
    products: Record<Product['id'], Product>
    productsForOrder: Record<string, number>
    isProductsLoading: boolean
    initProducts: () => Promise<void>
    setProductsForOrder: (productsForOrder: ProductsContextType['productsForOrder']) => void
    setProductsAmountForOrderById: (id: string, amount?: (curAmount: number) => number) => void
    setProducts: (products: ProductsContextType['products']) => void
}

const ProductsContext = createContext<ProductsContextType>({
    products: {},
    productsForOrder: {},
    isProductsLoading: false,
    initProducts: () => Promise.resolve(stub()),
    setProductsForOrder: stub,
    setProductsAmountForOrderById: stub,
    setProducts: stub,
})

export default ProductsContext
