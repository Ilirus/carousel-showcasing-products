import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import OverlayProvider from './OverlayProvider';
import OverlayContext from './OverlayContext';
import React, { useContext, type FC } from 'react';

// Mock createPortal as it's a DOM-specific function not directly testable in JSDOM without a real DOM.
// We want to render the portal content directly into the test environment for assertions.
vi.mock('react-dom', async (importOriginal) => {
    const actual = await importOriginal<object>();
    return {
        ...actual,
        createPortal: ({ children }: { children: React.ReactNode }) => children,
    };
});

const TestComponent: FC = () => {
    const { openModal, closeModal } = useContext(OverlayContext);
    return (
        <div>
            <button onClick={() => openModal(<div>Modal Content</div>)}>Open Modal</button>
            <button onClick={closeModal}>Close Modal</button>
        </div>
    );
};

describe('OverlayProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should provide openModal and closeModal functions through context', () => {
        render(
            <OverlayProvider>
                <TestComponent />
            </OverlayProvider>
        );

        const openButton = screen.getByText('Open Modal');
        expect(openButton).toBeInTheDocument();

        const closeButton = screen.getByText('Close Modal');
        expect(closeButton).toBeInTheDocument();
    });

    it('should open a modal with the provided content when openModal is called', () => {
        render(
            <OverlayProvider>
                <TestComponent />
            </OverlayProvider>
        );

        const openButton = screen.getByText('Open Modal');
        act(() => {
            openButton.click();
        });

        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('should close the modal when closeModal is called', () => {
        render(
            <OverlayProvider>
                <TestComponent />
            </OverlayProvider>
        );

        const openButton = screen.getByText('Open Modal');
        act(() => {
            openButton.click();
        });

        expect(screen.getByText('Modal Content')).toBeInTheDocument();

        const closeButton = screen.getByText('Close Modal');
        act(() => {
            closeButton.click();
        });

        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('should close the modal when clicking on the overlay background', () => {
        render(
            <OverlayProvider>
                <TestComponent />
            </OverlayProvider>
        );

        const openButton = screen.getByText('Open Modal');
        act(() => {
            openButton.click();
        });

        expect(screen.getByText('Modal Content')).toBeInTheDocument();

        // The ModalOverlay component itself handles the click to close, so we simulate a click on the overlay.
        // Since createPortal is mocked, ModalOverlay's root div is directly in the test DOM.
        const overlay = screen.getByTestId('modal-overlay-background'); // Add data-testid to ModalOverlay's background div for easier selection
        act(() => {
            overlay.click();
        });

        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });
});
