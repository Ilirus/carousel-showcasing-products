import CartModal from '@components/cartModal/CartModal'
import Badge from '@components/common/badge/Badge'
import Button from '@components/common/button/Button'
import OverlayContext from '@contexts/overlay/OverlayContext'
import ProductsContext from '@contexts/product/ProductsContext'
import { GiftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useContext, useMemo, type FC } from 'react'

const Header: FC = () => {
    const { productsForOrder } = useContext(ProductsContext)
    const { openModal, closeModal } = useContext(OverlayContext)
    const productsAmount = useMemo(() => Object.keys(productsForOrder).length, [productsForOrder])
    return (
        <header className="flex h-22 w-full justify-between items-center py-2.5 md:py-5 px-5 md:px-10 bg-yellow-400">
            <div className="cursor-default">
                <div className="flex justify-between items-center text-4xl font-bold">
                    Gift Store
                    <GiftIcon className="size-9 ml-1.5" />
                </div>
                <span className="text-xl italic">
                    Find something special
                </span>
            </div>
            <Badge
                count={productsAmount}
            >
                <Button
                    title="Buy Now"
                    type="button"
                    isFilled
                    onClick={() => openModal(<CartModal onClose={closeModal} />)}
                >
                    <ShoppingBagIcon className="size-6 mr-2" />
                    Buy Now
                </Button>
            </Badge>
        </header>
    )
}

export default Header
