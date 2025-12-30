import "./modalOverlay.css"
import { type FC, type PropsWithChildren } from 'react'

export interface IModalOverlayProps {
	closeModal: () => void
	isDefaultHeader?: boolean
}

const ModalOverlay: FC<PropsWithChildren<IModalOverlayProps>> = ({
	children,
	closeModal
}) => {
	return (
		<div data-testid="modal-overlay-background" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto" onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

export default ModalOverlay