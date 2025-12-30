import { useContext, type FC } from 'react'
import Carousel from '../common/carousel/Carousel'
import ProductCard from '../productCard/ProductCard';
import ProductsContext from '../../contexts/product/ProductContext';
import OverlayContext from '../../contexts/overlay/OverlayContext';
import CartModal from '../cartModal/CartModal';

const ProductCardCarousel: FC = () => {
	const { setProductsAmountForOrderById, products } = useContext(ProductsContext);
	const { openModal, closeModal } = useContext(OverlayContext);
	const addProductForOrder = (id: string) => {
		setProductsAmountForOrderById(id, (amount) => amount + 1)
	}
	const onAdd = (id: string) => {
		addProductForOrder(id);
		openModal(<CartModal onClose={closeModal} />)
	}
	return (
		<Carousel>
			{
				Object.values(products).map(({ title, url, description, price, id }) => {
					return (
						<ProductCard
							title={title}
							imageUrl={`./${url}`}
							description={description}
							onAdd={() => onAdd(id)}
							price={price}
						/>
					)
				})
			}
		</Carousel>
	)
}

export default ProductCardCarousel