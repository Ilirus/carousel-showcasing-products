import { type Product } from '@app-types/product'
import OverlayContext from '@contexts/overlay/OverlayContext'
import ProductsContext from '@contexts/product/ProductsContext'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import ProductCardCarousel from './ProductCardCarousel'

// Mock the contexts
const mockInitProducts = vi.fn()
const mockSetProductsAmountForOrderById = vi.fn()
const mockOpenModal = vi.fn()
const mockCloseModal = vi.fn()

const mockProducts: Record<string, Product> = {
    '1': { id: '1', title: 'Product 1', description: 'Desc 1', price: 10, url: 'url1' },
    '2': { id: '2', title: 'Product 2', description: 'Desc 2', price: 20, url: 'url2' },
}

const renderProductCardCarousel = (
    isProductsLoading: boolean,
    products: Record<string, Product> = mockProducts
) => {
    return render(
        <OverlayContext.Provider value={{ openModal: mockOpenModal, closeModal: mockCloseModal }}>
            <ProductsContext.Provider
                value={{
                    products,
                    isProductsLoading,
                    initProducts: mockInitProducts,
                    setProductsAmountForOrderById: mockSetProductsAmountForOrderById,
                    productsForOrder: {},
                    setProducts: vi.fn(),
                    setProductsForOrder: vi.fn()
                }}
            >
                <ProductCardCarousel />
            </ProductsContext.Provider>
        </OverlayContext.Provider>
    )
}

describe('ProductCardCarousel', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the "Update Products" button', () => {
        renderProductCardCarousel(false)
        expect(screen.getByRole('button', { name: /Update Products/i })).toBeInTheDocument()
    })

    it('renders product cards when products are not loading', () => {
        renderProductCardCarousel(false)
        expect(screen.getByText('Product 1')).toBeInTheDocument()
        expect(screen.getByText('Product 2')).toBeInTheDocument()
    })

    it('calls initProducts when "Update Products" button is clicked', () => {
        renderProductCardCarousel(false)
        fireEvent.click(screen.getByRole('button', { name: /Update Products/i }))
        expect(mockInitProducts).toHaveBeenCalledTimes(1)
    })
})
