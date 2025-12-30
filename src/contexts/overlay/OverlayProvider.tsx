import { useState, type PropsWithChildren, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import OverlayContext, { type IOverlayContext } from './OverlayContext';
import ModalOverlay from '../../components/common/modalOverlay/ModalOverlay';

const OverlayProvider: FC<PropsWithChildren> = ({ children }) => {
	const [modalContent, setModalContent] = useState<ReactNode | null>(null);

	const openModal: IOverlayContext['openModal'] = (content) => setModalContent(content);
	const closeModal = () => setModalContent(null);

	return (
		<OverlayContext.Provider 
			value={{ 
				openModal, 
				closeModal
			}}
		>
			{children}
			{modalContent && createPortal(
				<ModalOverlay closeModal={closeModal}>
					{modalContent}
				</ModalOverlay>,
				document.body
			)}
		</OverlayContext.Provider>
	);
};

export default OverlayProvider;