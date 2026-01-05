import CartModal from '@components/cartModal/CartModal'
import OverlayContext from '@contexts/overlay/OverlayContext'
import ProductsContext, { type ProductsContextType } from '@contexts/product/ProductsContext'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Header from './Header'

const mockProductsForOrder = {
    '1': 2,
    '2': 1,
}
const mockProductsContextValue: ProductsContextType = {
    products: {},
    productsForOrder: {},
    isProductsLoading: false,
    setProducts: vi.fn(),
    initProducts: vi.fn(),
    setProductsAmountForOrderById: vi.fn(),
    setProductsForOrder: vi.fn(),
}

const mockOpenModal = vi.fn()
const mockCloseModal = vi.fn()
const mockOverlayContextValue = {
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
    isOverlayOpened: false,
    modalContent: null,
}

const customRender = (productsForOrder: ProductsContextType['productsForOrder'] = {}) => {
    return render(
        <ProductsContext.Provider value={{ ...mockProductsContextValue, productsForOrder }}>
            <OverlayContext.Provider value={mockOverlayContextValue}>
                <Header />
            </OverlayContext.Provider>
        </ProductsContext.Provider>
    )
}

describe('Header', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render the "Gift Store" title and tagline', () => {
        customRender()
        expect(screen.getByText('Gift Store')).toBeInTheDocument()
        expect(screen.getByText('Find something special')).toBeInTheDocument()
    })

    it('should display the correct amount of products in the badge', () => {
        customRender(mockProductsForOrder)
        // Object.keys(mockProductsForOrder).length is 2
        expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('should call openModal with CartModal when "Buy Now" button is clicked', () => {
        customRender()
        const buyNowButton = screen.getByRole('button', { name: /Buy Now/i })
        fireEvent.click(buyNowButton)

        expect(mockOpenModal).toHaveBeenCalledTimes(1)
        expect(mockOpenModal).toHaveBeenCalledWith(expect.any(Object))

        // Further check if the argument passed to openModal is a CartModal instance
        const modalComponent = mockOpenModal.mock.calls[0][0]
        expect(modalComponent.type).toBe(CartModal)
        expect(modalComponent.props.onClose).toBe(mockCloseModal)
    })
})
