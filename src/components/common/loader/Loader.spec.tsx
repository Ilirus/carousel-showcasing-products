import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Loader from './Loader'

describe('Loader', () => {
    it('should render the SVG element', () => {
        render(<Loader />)
        expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    })

    it('should apply custom className', () => {
        render(<Loader className="custom-loader" />)
        const svgElement = screen.getByRole('img', { hidden: true })
        expect(svgElement).toHaveClass('custom-loader')
    })

    it('should apply default size if not provided', () => {
        render(<Loader />)
        const svgElement = screen.getByRole('img', { hidden: true })
        expect(svgElement).toHaveAttribute('style', '--size: calc(var(--spacing) * 6);')
    })

    it('should apply the provided size', () => {
        render(<Loader size={10} />)
        const svgElement = screen.getByRole('img', { hidden: true })
        expect(svgElement).toHaveAttribute('style', '--size: calc(var(--spacing) * 10);')
    })
})