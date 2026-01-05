import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import ProductCard from './ProductCard'

describe('ProductCard', () => {
    const mockProduct = {
        title: 'Test Product',
        description: 'This is a brief description of the test product.',
        imageUrl: 'https://via.placeholder.com/150',
        price: 99.99,
        onAdd: vi.fn(),
    }

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should call onAdd when the Add button is clicked', () => {
        render(<ProductCard {...mockProduct} />)
        const addButton = screen.getByRole('button', { name: /Add/i })
        fireEvent.click(addButton)
        expect(mockProduct.onAdd).toHaveBeenCalledTimes(1)
    })
})
