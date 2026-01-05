import { render, screen } from '@testing-library/react'
import React, { useContext, type FC } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import OverlayContext from './OverlayContext'
import OverlayProvider from './OverlayProvider'

vi.mock('react-dom', async (importOriginal) => {
    const actual = await importOriginal<object>()
    return {
        ...actual,
        createPortal: ({ children }: { children: React.ReactNode }) => children,
    }
})

const TestComponent: FC = () => {
    const { openModal, closeModal } = useContext(OverlayContext)
    return (
        <div>
            <button onClick={() => openModal(<div>Modal Content</div>)}>Open Modal</button>
            <button onClick={closeModal}>Close Modal</button>
        </div>
    )
}

describe('OverlayProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should provide openModal and closeModal functions through context', () => {
        render(
            <OverlayProvider>
                <TestComponent />
            </OverlayProvider>
        )

        const openButton = screen.getByText('Open Modal')
        expect(openButton).toBeInTheDocument()

        const closeButton = screen.getByText('Close Modal')
        expect(closeButton).toBeInTheDocument()
    })
})
