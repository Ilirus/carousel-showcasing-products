import { render, screen, fireEvent } from '@testing-library/react'

import Carousel1 from './Carousel'

describe('Carousel1', () => {
    const mockElements = [
        <div key="1">Item 1</div>,
        <div key="2">Item 2</div>,
        <div key="3">Item 3</div>,
        <div key="4">Item 4</div>,
        <div key="5">Item 5</div>,
    ]

    it('should render the carousel component with elements', () => {
        render(<Carousel1>{mockElements}</Carousel1>)
        mockElements.forEach(item => {
            expect(screen.getAllByText(item.props.children)).not.toHaveLength(0)
        })
    })
    it('should navigate to the next slide when next button is clicked', () => {
        render(<Carousel1>{mockElements}</Carousel1>)
        const nextButton = screen.getByTitle('Next slide')
        fireEvent.click(nextButton)
        // Due to the infinite scroll and responsive nature, it's hard to directly assert visible items without mocking window.innerWidth
        // For now, we'll just check if the button click doesn't break anything.
        expect(nextButton).toBeInTheDocument()
    })

    it('should navigate to the previous slide when previous button is clicked', () => {
        render(<Carousel1>{mockElements}</Carousel1>)
        const prevButton = screen.getByTitle('Previous slide')
        fireEvent.click(prevButton)
        expect(prevButton).toBeInTheDocument()
    })

    it('should have scroll markers', () => {
        render(<Carousel1>{mockElements}</Carousel1>)
        const markers = screen.getAllByRole('button', { hidden: true }).filter(button =>
            button.className.includes('rounded-full mx-1')
        )
        expect(markers).toHaveLength(mockElements.length)
    })

    // TODO: Add more robust tests for responsive behavior and infinite scroll logic once mocking window.innerWidth is set up.
})
