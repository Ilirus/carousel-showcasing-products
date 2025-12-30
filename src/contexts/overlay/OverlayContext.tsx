import { createContext, type ReactNode } from 'react';
import { stub } from '../../utils/common/common';

export interface IOverlayContext {
    openModal: (content: ReactNode) => void, 
    closeModal: () => void
}

const OverlayContext = createContext<IOverlayContext>({
    openModal: stub,
    closeModal: stub 
});

export default OverlayContext;