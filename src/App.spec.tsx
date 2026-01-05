import { render, screen } from '@testing-library/react';
import { vi } from 'vitest'; // Import vi for mocking
import App from './App';

// Mocking Header component
vi.mock('@components/header/Header', () => ({
  default: () => <header data-testid="mocked-header">Mocked Header</header>,
}));

// Mocking ProductCardCarousel component
vi.mock('@features/product/productCardCarousel/ProductCardCarousel', () => ({
  default: () => <div data-testid="mocked-product-card-carousel">Mocked ProductCardCarousel</div>,
}));

describe('App', () => {
  it('renders Header and ProductCardCarousel components correctly', () => {
    render(<App />);

    // Check if the mocked Header is in the document
    expect(screen.getByTestId('mocked-header')).toBeInTheDocument();

    // Check if the mocked ProductCardCarousel is in the document
    expect(screen.getByTestId('mocked-product-card-carousel')).toBeInTheDocument();
  });
});