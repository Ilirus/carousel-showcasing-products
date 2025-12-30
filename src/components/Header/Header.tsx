import "./Header.css";
import AppButton from "../common/button/Button";
import AppBadge from "../common/badge/Badge";
import { useContext, useMemo, type FC } from "react";
import ProductsContext from "../../contexts/product/ProductContext";
import OverlayContext from "../../contexts/overlay/OverlayContext";
import CartModal from "../cartModal/CartModal";
import { GiftIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const Header: FC = () => {
	const {productsForOrder} = useContext(ProductsContext);
	const {openModal, closeModal} = useContext(OverlayContext);
	const productsAmount = useMemo(() => Object.keys(productsForOrder).length, [productsForOrder]);
	return (
		<header className="flex min-h-18.75 justify-between items-center py-5 px-10 bg-yellow-400">
			<div className="cursor-default">
				<div className="flex justify-between items-center text-4xl font-bold">
					Gift Store
					<GiftIcon className="size-9 ml-1.5" />
				</div>
				<span className="text-xl italic">
					Find something special
				</span>
			</div>
			<AppBadge
				count={productsAmount}
			>
				<AppButton
					type="button"
					icon={<ShoppingBagIcon className="size-6 mr-1.5" />}
					onClick={() => openModal(<CartModal onClose={closeModal} />)}
					className="flex text-lg justify-between items-center cursor-pointer bg-black font-bold rounded-xl text-yellow-400 
				px-4 py-2 transition delay-250 duration-500 ease-in-out hover:ring-3 hover:bg-yellow-400 hover:text-black"
				>
					Buy Now
				</AppButton>
			</AppBadge>
		</header>
	)
}

export default Header;