import { stub } from '@utils/common/common'
import { createContext, type ReactNode } from 'react'


export interface OverlayContextType {
    openModal: (content: ReactNode) => void,
    closeModal: () => void
}

const OverlayContext = createContext<OverlayContextType>({
    openModal: stub,
    closeModal: stub,
})

export default OverlayContext
