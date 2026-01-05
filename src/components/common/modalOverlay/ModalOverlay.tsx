import { type FC, type PropsWithChildren } from 'react'

export interface ModalOverlayProps {
    closeModal: () => void
    isDefaultHeader?: boolean
}

const ModalOverlay: FC<PropsWithChildren<ModalOverlayProps>> = ({
    children,
    closeModal,
}) => {
    return (
        <div
            data-testid="modal-overlay-background"
            className="fixed flex-col inset-0 bg-black/50 flex z-50 p-2 overflow-x-hidden overflow-y-auto"
            onClick={closeModal}
        >
            <div className='flex flex-col flex-1 items-center justify-center w-full'>
                <div className="flex flex-col bg-white rounded-lg shadow-lg max-w-[90vw] w-full sm:w-fit min-w-80 min-h-90 overflow-hidden" onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalOverlay
