import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import ModalOverlay from './ModalOverlay'

describe('ModalOverlay', () => {
    const mockCloseModal = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render children correctly', () => {
        render(
            <ModalOverlay closeModal={mockCloseModal}>
                <div>Test Child Content</div>
            </ModalOverlay>
        )
        expect(screen.getByText('Test Child Content')).toBeInTheDocument()
    })

    it('should call closeModal when the overlay background is clicked', () => {
        render(
            <ModalOverlay closeModal={mockCloseModal}>
                <div>Test Child Content</div>
            </ModalOverlay>
        )
        const overlayBackground = screen.getByTestId('modal-overlay-background')
        fireEvent.click(overlayBackground)
        expect(mockCloseModal).toHaveBeenCalledTimes(1)
    })

    it('should NOT call closeModal when the modal content is clicked', () => {
        render(
            <ModalOverlay closeModal={mockCloseModal}>
                <div>Test Child Content</div>
            </ModalOverlay>
        )
        const modalContent = screen.getByText('Test Child Content').closest('.bg-white')
        if (modalContent) {
            fireEvent.click(modalContent)
        } else {
            throw new Error('Could not find modal content element')
        }
        expect(mockCloseModal).not.toHaveBeenCalled()
    })
})
