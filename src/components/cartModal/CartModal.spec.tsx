import ProductsContext, { type ProductsContextType } from '@contexts/product/ProductsContext'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import CartModal from './CartModal'

const mockProducts: ProductsContextType['products'] = {
    '1': {
        id: '1',
        title: 'Product A',
        description: 'Description A',
        price: 10,
        url: 'url-a.jpg',
    },
    '2': {
        id: '2',
        title: 'Product B',
        description: 'Description B',
        price: 20,
        url: 'url-b.jpg',
    },
}

const mockProductsForOrder: ProductsContextType['productsForOrder'] = {
    '1': 2,
    '2': 1,
}

const mockSetProductsAmountForOrderById = vi.fn()
const mockSetProductsForOrder = vi.fn()
const mockOnClose = vi.fn()
const mockValue = {
	products: mockProducts,
    productsForOrder: {},
    initProducts: vi.fn(),
    isProductsLoading: false,
    setProducts: vi.fn(),
    setProductsAmountForOrderById: mockSetProductsAmountForOrderById,
    setProductsForOrder: mockSetProductsForOrder,
}

const customRender = (ui: React.ReactElement, {
    products = mockProducts,
    productsForOrder = {},
    initProducts = vi.fn(),
    isProductsLoading = false,
    setProducts = vi.fn(),
    setProductsAmountForOrderById = mockSetProductsAmountForOrderById,
    setProductsForOrder = mockSetProductsForOrder,
}: ProductsContextType = mockValue) => {
    return render(
        <ProductsContext.Provider
            value={{
                products,
                productsForOrder,
                initProducts,
                isProductsLoading,
                setProducts,
                setProductsAmountForOrderById,
                setProductsForOrder,
            }}
        >
            {ui}
        </ProductsContext.Provider>
    )
}

describe('CartModal', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        global.alert = vi.fn()
    })

    it('should render the title "Your Orders"', () => {
        customRender(<CartModal onClose={mockOnClose} />)
        expect(screen.getByText('Your Orders')).toBeInTheDocument()
    })

    it('should display "Your shopping cart is empty" when productsList is empty', () => {
        customRender(<CartModal onClose={mockOnClose} />)
        expect(screen.getByText(/Your shopping cart is empty/i)).toBeInTheDocument()
        expect(screen.getByText(/Return to shopping/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Buy' })).toBeDisabled()
    })

    it('should display discounted total sum when total products are 5 or more', () => {
        const largeOrderProductsForOrder: ProductsContextType['productsForOrder'] = {
            '1': 3,
            '2': 2,
        }
        customRender(<CartModal onClose={mockOnClose} />, { ...mockValue, productsForOrder: largeOrderProductsForOrder })

        // Product A: 3 * $10 = $30
        // Product B: 2 * $20 = $40
        // Sum = $70
        // Discount = $70 * 0.1 = $7
        // Total sum = $63

        expect(screen.getByText('Sum: $70')).toBeInTheDocument()
        expect(screen.getByText('$7 (10%)')).toBeInTheDocument()
        expect(screen.getByText('Tottal sum: $63')).toBeInTheDocument()
    })

    it('should call setProductsAmountForOrderById with 0 when trash icon is clicked', () => {
        customRender(<CartModal onClose={mockOnClose} />, { ...mockValue, productsForOrder: mockProductsForOrder })
        fireEvent.click(screen.getAllByTitle('Delete product')[0])
        expect(mockSetProductsAmountForOrderById).toHaveBeenCalledWith('1')
    })

    it('should call setProductsAmountForOrderById with amount - 1 when minus icon is clicked', () => {
        customRender(<CartModal onClose={mockOnClose} />, { ...mockValue, productsForOrder: mockProductsForOrder })
        fireEvent.click(screen.getAllByTitle('Reduce product\'s amount')[0])
        expect(mockSetProductsAmountForOrderById).toHaveBeenCalledWith('1', expect.any(Function))
        const callback = mockSetProductsAmountForOrderById.mock.calls[0][1]
        expect(callback(2)).toBe(1) // Assuming current amount for product 1 is 2
    })

    it('should call setProductsAmountForOrderById with amount + 1 when plus icon is clicked', () => {
        customRender(<CartModal onClose={mockOnClose} />, { ...mockValue, productsForOrder: mockProductsForOrder })
        fireEvent.click(screen.getAllByTitle('Increase product\'s amount')[0])
        expect(mockSetProductsAmountForOrderById).toHaveBeenCalledWith('1', expect.any(Function))
        const callback = mockSetProductsAmountForOrderById.mock.calls[0][1]
        expect(callback(2)).toBe(3) // Assuming current amount for product 1 is 2
    })

    it('should disable the plus button when amount reaches 999', () => {
        const product999ForOrder = {
            '1': 999,
        }
        customRender(<CartModal onClose={mockOnClose} />, { ...mockValue, productsForOrder: product999ForOrder })
        expect(screen.getByTitle('Increase product\'s amount')).toBeDisabled()
    })

    it('should call setProductsForOrder with an empty object and onClose when buy button is clicked', () => {
        customRender(<CartModal onClose={mockOnClose} />, { ...mockValue, productsForOrder: mockProductsForOrder })
        fireEvent.click(screen.getByRole('button', { name: 'Buy' }))
        expect(global.alert).toHaveBeenCalledWith('Payment is successful!')
        expect(mockSetProductsForOrder).toHaveBeenCalledWith({})
        expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
})
