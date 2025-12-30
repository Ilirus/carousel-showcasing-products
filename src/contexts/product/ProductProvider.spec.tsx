import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ProductProvider from './ProductProvider';
import ProductsContext from './ProductContext';
import { useContext, type FC } from 'react';
import { getProducts } from '../../api/products/products';
import type { IProduct } from '../../types/product';

// Mock the getProducts API call
vi.mock('../../api/products/products', () => ({
    getProducts: vi.fn(),
}));

const mockProducts: IProduct[] = [
    { id: "1", title: "Product 1", description: "Desc 1", price: 10, url: "url1" },
    { id: "2", title: "Product 2", description: "Desc 2", price: 20, url: "url2" },
];

const TestComponent: FC = () => {
    const { products, productsForOrder, setProductsAmountForOrderById, setProductsForOrder } = useContext(ProductsContext);

    return (
        <div>
            <span data-testid="products-count">{Object.keys(products).length}</span>
            <span data-testid="orders-count">{Object.keys(productsForOrder).length}</span>
            <button onClick={() => setProductsAmountForOrderById("1", (amount) => amount + 1)}>Add Product 1</button>
            <button onClick={() => setProductsAmountForOrderById("1", (amount) => amount - 1)}>Remove Product 1</button>
            <button onClick={() => setProductsAmountForOrderById("3", (amount) => amount + 1)}>Add Non-Existent Product</button>
            <button onClick={() => setProductsForOrder({ "1": 5 })}>Set Orders</button>
        </div>
    );
};

describe('ProductProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (getProducts as ReturnType<typeof vi.fn>).mockResolvedValue(mockProducts);
    });

    it('should fetch and set products on initial render', async () => {
        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        );

        expect(getProducts).toHaveBeenCalledTimes(1);
        expect(await screen.findByTestId('products-count')).toHaveTextContent('2');
    });

    it('should add a product to order', async () => {
        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        );

        await screen.findByTestId('products-count'); // Wait for products to load

        const addButton = screen.getByText('Add Product 1');
        act(() => {
            addButton.click();
        });

        expect(await screen.findByTestId('orders-count')).toHaveTextContent('1');    });

    it('should remove a product from order when amount becomes 0 or less', async () => {
        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        );

        await screen.findByTestId('products-count');

        const addButton = screen.getByText('Add Product 1');
        act(() => {
            addButton.click();
        });

        expect(await screen.findByTestId('orders-count')).toHaveTextContent('1');

        const removeButton = screen.getByText('Remove Product 1');
        act(() => {
            removeButton.click();
        });

        expect(await screen.findByTestId('orders-count')).toHaveTextContent('0');
    });

    it('should throw an error if trying to add a non-existent product', async () => {
        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        );

        await screen.findByTestId('products-count');

        const addNonExistentButton = screen.getByText('Add Non-Existent Product');
        // Expecting an error, but react-testing-library's act doesn't handle sync errors from event handlers
        // The error will be logged to console but not caught by expect().toThrow()
        // For more robust error testing in components, consider error boundaries or specific utilities.
        // For now, we expect console.error to be called.
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        act(() => {
            addNonExistentButton.click();
        });
        // The error is thrown synchronously within the `setProductsAmountForOrderById` call.
        // If the error is not caught, it will propagate up and potentially crash the test runner.
        // The error boundary approach is generally preferred for React component error testing.
        expect(consoleErrorSpy).toHaveBeenCalled(); // Should catch the error logged by React.
        consoleErrorSpy.mockRestore();
    });

    it('should correctly set products for order using setProductsForOrder', async () => {
        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        );

        await screen.findByTestId('products-count');

        const setOrdersButton = screen.getByText('Set Orders');
        act(() => {
            setOrdersButton.click();
        });

        expect(await screen.findByTestId('orders-count')).toHaveTextContent('1');
    });
});
