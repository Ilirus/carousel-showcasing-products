import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    title: 'Test Product',
    description: 'This is a brief description of the test product.',
    imageUrl: 'https://via.placeholder.com/150',
    price: 99.99,
    onAdd: () => {},
  };

  it('should render product details correctly', () => {
    render(<ProductCard {...mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute('src', mockProduct.imageUrl);
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  it('should call onAdd when the Add button is clicked', () => {
    render(<ProductCard {...mockProduct} />);
    const addButton = screen.getByRole('button', { name: /Add/i });
    fireEvent.click(addButton);
    expect(mockProduct.onAdd).toHaveBeenCalledTimes(1);
  });
});
