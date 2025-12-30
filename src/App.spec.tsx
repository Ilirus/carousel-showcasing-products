import { screen, render } from "@testing-library/react";
import App from "./App";
import { vi } from 'vitest';

// Mock the child components to isolate App's rendering logic
vi.mock('./components/header/Header', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="mock-header">Mock Header</div>),
}));

vi.mock('./components/productCardCarousel/ProductCardCarousel', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="mock-product-card-carousel">Mock Product Card Carousel</div>),
}));

describe("App tests", () => {
  it("should render Header and ProductCardCarousel components", () => {
    render(<App />);

    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-product-card-carousel")).toBeInTheDocument();
  });
});
