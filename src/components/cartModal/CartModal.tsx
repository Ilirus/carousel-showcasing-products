import Button from '@components/common/button/Button'
import ProductsContext from '@contexts/product/ProductsContext'
import { MinusIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useContext, type FC } from 'react'


export interface CartModalProps {
    onClose: () => void
}

const CartModal: FC<CartModalProps> = ({ onClose }) => {
    const { products, productsForOrder, setProductsAmountForOrderById, setProductsForOrder } = useContext(ProductsContext)
    let sum = 0
    let amountOfProducts = 0
    const productsList = Object.entries(productsForOrder)
    productsList.forEach(([
        id,
        amount,
    ]) => {
        amountOfProducts += amount
        sum += products[id].price * amount
    })
    const onBuy = () => {
        setProductsForOrder({})
        onClose()
        alert('Payment is successful!')
    }
    return (
        <>
            <div className="flex justify-between min-w-75 items-center border-b border-gray-400 mb-4 px-6 py-4 bg-amber-400">
                <h2 className="text-2xl font-semibold">
                    Your Orders
                </h2>
                <Button
                    title='Close modal'
                    onClick={onClose}
                >
                    <XMarkIcon className='size-5' />
                </Button>
            </div>
            <div className="flex flex-col flex-1 overflow-hidden list px-6 py-4 sm:min-w-125 md:min-w-160 max-h-122 sm:max-h-155">
                {productsList.length === 0 ? (
                    <p className='text-lg text-center mb-6'>
                        Your shopping cart is empty<br />
                        Return to shopping
                    </p>
                ) : (
                    <div className='divide-y divide-gray-300 overflow-auto gap-2'>
                        {productsList.map(([
                            id,
                            amount,
                        ]) => {
                            const { title, price, url } = products[id]
                            const tottal = price * amount
                            return (
                                <div key={id} className='flex flex-col md:flex-row md:h-60 p-2 gap-4 text-lg'>
                                    <div
                                        className='flex bg-contain bg-no-repeat bg-center w-full h-55 md:h-full md:w-65'
                                        style={{
                                            backgroundImage: `url(${url})`,
                                        }}
                                    />
                                    <div className='flex flex-col justify-between flex-1 gap-4'>
                                        <div className='flex justify-between items-start gap-4'>
                                            <p className='text-xl font-bold mt-2 w-60 line-clamp-3 text-ellipsis'>
                                                {title}
                                            </p>
                                            <Button
                                                title={'Delete product'}
                                                onClick={() => setProductsAmountForOrderById(id)}
                                            >
                                                <TrashIcon className='size-7' />
                                            </Button>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <p className='hidden md:block'>${price}</p>
                                            <div className='flex items-center'>
                                                <Button
                                                    title={'Reduce product\'s amount'}
                                                    onClick={() => setProductsAmountForOrderById(id, (amount) => amount - 1)}
                                                >
                                                    <MinusIcon className='size-5' />
                                                </Button>
                                                <span className='w-9 whitespace-nowrap text-ellipsis text-center'>{amount}</span>
                                                <Button
                                                    title={'Increase product\'s amount'}
                                                    disabled={amount >= 999}
                                                    onClick={() => setProductsAmountForOrderById(id, (amount) => amount + 1)}
                                                >
                                                    <PlusIcon className='size-5' />
                                                </Button>
                                            </div>
                                            <p className='text-center'>${tottal}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
                <div className='flex flex-col items-end mt-6'>
                    <p className={`${amountOfProducts < 5 && 'opacity-0'}`}>
                        Sum: ${sum}
                    </p>
                    <p className={`${amountOfProducts < 5 && 'opacity-0'}`}>
                        Discount: <span className='text-red-500'>${sum * .1} (10%)</span>
                    </p>
                    <p className='font-bold text-xl'>
                        Tottal sum: ${amountOfProducts < 5 ? sum : sum * .9}
                    </p>
                </div>
            </div>
            <div className='flex justify-end gap-3 px-6 py-4 mt-4 border-t border-gray-400 bg-amber-400'>
                <Button
                    title='Close modal'
                    onClick={onClose}
                    className='px-4 py-2 rounded-lg'
                >
                    Close
                </Button>
                <Button
                    title='Buy'
                    isFilled
                    onClick={onBuy}
                    disabled={productsList.length === 0}
                >
                    Buy
                </Button>
            </div>
        </>
    )
}

export default CartModal
