import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import Badge from './Badge'

describe('Badge', () => {
    it('should render children without a count', () => {
        render(<Badge>Test Child</Badge>)
        expect(screen.getByText('Test Child')).toBeInTheDocument()
        expect(screen.queryByText(/\d+/)).not.toBeInTheDocument()
    })

    it('should render the count when provided and greater than 0', () => {
        render(<Badge count={5}>Test Child</Badge>)
        expect(screen.getByText('Test Child')).toBeInTheDocument()
        expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should not render the count when count is 0', () => {
        render(<Badge count={0}>Test Child</Badge>)
        expect(screen.getByText('Test Child')).toBeInTheDocument()
        expect(screen.queryByText(/\d+/)).not.toBeInTheDocument()
    })

    it('should apply custom className to the count badge', () => {
        render(<Badge count={1} className="custom-class">Test Child</Badge>)
        const badgeCount = screen.getByText('1')
        expect(badgeCount).toBeInTheDocument()
        expect(badgeCount).toHaveClass('custom-class')
    })
})
