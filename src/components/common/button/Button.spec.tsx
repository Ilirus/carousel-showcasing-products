import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import Button from './Button'

describe('Button Component', () => {
    it('should render a button with text content and title attribute', () => {
        render(<Button title="Test Button">Click Me</Button>)
        const buttonElement = screen.getByRole('button', { name: /click me/i })
        expect(buttonElement).toBeInTheDocument()
        expect(buttonElement).toHaveTextContent('Click Me')
        expect(buttonElement).toHaveAttribute('title', 'Test Button')
    })

    it('should apply custom class names', () => {
        render(<Button title="Custom Class Button" className="custom-class another-class">Click Me</Button>)
        const buttonElement = screen.getByRole('button', { name: /click me/i })
        expect(buttonElement).toHaveClass('custom-class')
        expect(buttonElement).toHaveClass('another-class')
    })

    it('should be disabled when the disabled prop is true', () => {
        render(<Button title="Disabled Button" disabled>Disabled</Button>)
        const buttonElement = screen.getByRole('button', { name: /disabled/i })
        expect(buttonElement).toBeDisabled()
        expect(buttonElement).toHaveClass('cursor-not-allowed')
    })

    it('should render an icon-only button with default styling (not FBA, not filled)', () => {
        render(<Button title="Close"><XMarkIcon className="h-6 w-6" /></Button>)
        const buttonElement = screen.getByRole('button', { name: /close/i })
        expect(buttonElement).toBeInTheDocument()
        expect(buttonElement).toHaveAttribute('title', 'Close')
        expect(buttonElement).toHaveClass('p-2 rounded-full')
    })

    it('should render an icon-only button with isFBA prop', () => {
        render(<Button title="Add" isFBA><PlusIcon className="h-5 w-5" /></Button>)
        const buttonElement = screen.getByRole('button', { name: /add/i })
        expect(buttonElement).toBeInTheDocument()
        expect(buttonElement).toHaveClass('p-2 rounded-full')
    })

    it('should apply default styles for non-filled, non-reversed buttons', () => {
        render(<Button title="Default Style">Default</Button>)
        const buttonElement = screen.getByRole('button', { name: /default/i })
        expect(buttonElement).toHaveClass('transition-colors', 'duration-300', 'ease-in-out', 'cursor-pointer')
        expect(buttonElement).toHaveClass('hover:bg-black')
        expect(buttonElement).toHaveClass('hover:text-yellow-400')
    })

    it('should apply styles for isFilled prop', () => {
        render(<Button title="Filled Button" isFilled>Filled</Button>)
        const buttonElement = screen.getByRole('button', { name: /filled/i })
        expect(buttonElement).toHaveClass('bg-gray-950')
        expect(buttonElement).toHaveClass('hover:bg-black')
        expect(buttonElement).toHaveClass('hover:text-yellow-400')
        expect(buttonElement).toHaveClass('text-white')
    })

    it('should apply styles for isFilled and isReverse props', () => {
        render(<Button title="Filled Reverse Button" isFilled isReverse>Filled Reverse</Button>)
        const buttonElement = screen.getByRole('button', { name: /filled reverse/i })
        expect(buttonElement).toHaveClass('bg-white')
        expect(buttonElement).toHaveClass('hover:bg-yellow-400')
    })

    it('should apply styles for isReverse prop (not filled)', () => {
        render(<Button title="Reverse Button" isReverse>Reverse</Button>)
        const buttonElement = screen.getByRole('button', { name: /reverse/i })
        expect(buttonElement).toHaveClass('hover:bg-amber-400')
        expect(buttonElement).toHaveClass('hover:text-gray-950')
        expect(buttonElement).toHaveClass('text-yellow-400')
    })

})
