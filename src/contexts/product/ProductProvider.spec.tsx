import { getProducts } from '@api/products/products'
import type { Product } from '@app-types/product'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { useContext, type FC } from 'react'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'

import ProductProvider from './ProductProvider'
import ProductsContext from './ProductsContext'

// Mock the API call
vi.mock('@api/products/products', () => ({
    getProducts: vi.fn(),
}))

const mockProducts: Product[] = [
    { id: '1', title: 'Product 1', description: 'Desc 1', price: 10, url: 'url1' },
    { id: '2', title: 'Product 2', description: 'Desc 2', price: 20, url: 'url2' },
]

// --- Test Component for UI interactions ---
const TestComponent: FC = () => {
    const { products, productsForOrder, setProductsAmountForOrderById, setProductsForOrder, initProducts, isProductsLoading } = useContext(ProductsContext)

    return (
        <div>
            <span data-testid="products-count">{Object.keys(products).length}</span>
            <span data-testid="orders-count">{Object.keys(productsForOrder).length}</span>
            <span data-testid="loading-status">{isProductsLoading ? 'loading' : 'idle'}</span>
            <button onClick={() => setProductsAmountForOrderById('1', (amount) => amount + 1)}>Add Product 1</button>
            <button onClick={() => setProductsAmountForOrderById('1', (amount) => amount - 1)}>Remove Product 1</button>
            <button onClick={() => setProductsAmountForOrderById('3', (amount) => amount + 1)}>Add Non-Existent Product</button>
            <button onClick={() => setProductsForOrder({ '1': 5 })}>Set Orders</button>
            <button onClick={() => initProducts()}>Manual Init Products</button>
            {/* Button to test default behavior of setProductsAmountForOrderById */}
            <button onClick={() => setProductsAmountForOrderById('1')}>Remove Product 1 (Default Call)</button>
        </div>
    )
}

// --- Test Component for direct setter tests ---
const SetterTester: FC = () => {
    const { setProducts, setProductsForOrder, products, productsForOrder } = useContext(ProductsContext)

    return (
        <div>
            <span data-testid="setter-products-count">{Object.keys(products).length}</span>
            <span data-testid="setter-orders-count">{Object.keys(productsForOrder).length}</span>
            <button data-testid="set-products-btn"
                onClick={() => setProducts({
                    'prod-abc': { id: 'prod-abc', title: 'Prod ABC', description: 'Desc ABC', price: 50, url: 'url-abc' },
                })}>
                Set Products Directly
            </button>
            <button data-testid="set-orders-btn"
                onClick={() => setProductsForOrder({ 'order-xyz': 3 })}>
                Set Orders Directly
            </button>
        </div>
    )
}

describe('ProductProvider', () => {
    let getProductsMock: Mock<ReturnType<typeof vi.fn>>
    let consoleErrorSpy: Mock

    beforeEach(() => {
        vi.clearAllMocks()
        getProductsMock = getProducts as ReturnType<typeof vi.fn>
        getProductsMock.mockResolvedValue(mockProducts)

        // Spy on console.error to check for errors logged by the provider
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
        consoleErrorSpy.mockRestore() // Clean up spy
    })

    it('should fetch and set products on initial render', async () => {
        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        )

        // Initially, products are loading, so the count should be 0
        expect(screen.getByTestId('loading-status')).toHaveTextContent('loading')
        expect(screen.getByTestId('products-count')).toHaveTextContent('0')

        // Wait for products to be fetched and set
        expect(getProducts).toHaveBeenCalledTimes(1)
        expect(await screen.findByTestId('products-count')).toHaveTextContent('2')
        expect(screen.getByTestId('loading-status')).toHaveTextContent('idle')
    })

    it('should add a product to order', async () => {
        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        )

        await screen.findByTestId('products-count') // Wait for products to load

        const addButton = screen.getByText('Add Product 1')
        act(() => {
            addButton.click()
        })

        expect(await screen.findByTestId('orders-count')).toHaveTextContent('1')
    })

    it('should remove a product from order when amount becomes 0 or less', async () => {
        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        )

        await screen.findByTestId('products-count')

        const addButton = screen.getByText('Add Product 1')
        act(() => {
            addButton.click()
        })

        expect(await screen.findByTestId('orders-count')).toHaveTextContent('1')

        const removeButton = screen.getByText('Remove Product 1')
        act(() => {
            removeButton.click()
        })

        expect(await screen.findByTestId('orders-count')).toHaveTextContent('0')
    })

    it('should remove a product from order when setProductsAmountForOrderById is called without the amount function', async () => {
        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        )

        await screen.findByTestId('products-count') // Wait for products to load

        // Add product 1 first
        const addButton = screen.getByText('Add Product 1')
        act(() => {
            addButton.click()
        })
        expect(await screen.findByTestId('orders-count')).toHaveTextContent('1')

        // Click the button that calls setProductsAmountForOrderById without the function
        // This should trigger the default amount = () => 0 behavior, effectively removing the product.
        const removeDefaultButton = screen.getByText('Remove Product 1 (Default Call)')
        act(() => {
            removeDefaultButton.click()
        })

        // Expect the order count to go back to 0
        expect(await screen.findByTestId('orders-count')).toHaveTextContent('0')
    })

    it('should correctly set products for order using setProductsForOrder', async () => {
        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        )

        await screen.findByTestId('products-count')

        const setOrdersButton = screen.getByText('Set Orders')
        act(() => {
            setOrdersButton.click()
        })

        expect(await screen.findByTestId('orders-count')).toHaveTextContent('1')
    })

    it('should directly set productsForOrder using setProductsForOrder', async () => {
        render(
            <ProductProvider>
                <SetterTester />
            </ProductProvider>
        )

        const setOrdersButton = screen.getByTestId('set-orders-btn')
        const ordersCountElement = screen.getByTestId('setter-orders-count')

        expect(ordersCountElement).toHaveTextContent('0') // Initially empty

        act(() => {
            fireEvent.click(setOrdersButton)
        })

        // Wait for state update and check count
        expect(await screen.findByTestId('setter-orders-count')).toHaveTextContent('1')
    })

    it('should call manual initProducts when button is clicked', async () => {
        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        )
        // Ensure it's not called automatically again if already mounted, or just check if it can be called.
        // For this test, we assume the initial render already called initProducts. We test the button functionality.
        const manualInitButton = screen.getByText('Manual Init Products');
        // Resetting mock call count to specifically check button click.
        (getProducts as ReturnType<typeof vi.fn>).mockClear()

        act(() => {
            manualInitButton.click()
        })

        expect(getProducts).toHaveBeenCalledTimes(1)
        expect(await screen.findByTestId('products-count')).toHaveTextContent('2')
    })
})
