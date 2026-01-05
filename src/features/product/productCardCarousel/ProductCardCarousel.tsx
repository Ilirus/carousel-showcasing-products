import CartModal from '@components/cartModal/CartModal'
import Button from '@components/common/button/Button'
import Carousel from '@components/common/carousel/Carousel'
import Loader from '@components/common/loader/Loader'
import OverlayContext from '@contexts/overlay/OverlayContext'
import ProductsContext from '@contexts/product/ProductsContext'
import ProductCard from '@features/product/productCard/ProductCard'
import { useContext, type FC } from 'react'

const ProductCardCarousel: FC = () => {
    const { setProductsAmountForOrderById, products, isProductsLoading, initProducts } = useContext(ProductsContext)
    const { openModal, closeModal } = useContext(OverlayContext)
    const addProductForOrder = (id: string) => {
        setProductsAmountForOrderById(id, (amount) => amount + 1)
    }
    const onAdd = (id: string) => {
        addProductForOrder(id)
        openModal(<CartModal onClose={closeModal} />)
    }
    return (
        <>
            <Button
                title="Update Products"
                isFilled
                isReverse
                onClick={()=> initProducts()}
            >
                Update Products
            </Button>
            <Carousel className='h-125'>
                {
                    isProductsLoading ? (
                        [<Loader className='text-white' size={12}/>]
                    ) : (
                        Object.values(products).map(({ title, url, description, price, id }) => {
                            return (
                                <ProductCard
                                    key={id}
                                    title={title}
                                    imageUrl={`./${url}`}
                                    description={description}
                                    onAdd={() => onAdd(id)}
                                    price={price}
                                    className={'m-1 md:m-4'}
                                />
                            )
                        })
                    )
                }
            </Carousel>
        </>
    )
}

export default ProductCardCarousel
