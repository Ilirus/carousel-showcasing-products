import { useContext, type FC } from 'react'
import ProductsContext from '../../contexts/product/ProductContext'
import Button from '../common/button/Button'
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'

export interface CartModalProps {
	onClose: () => void
}

const CartModal: FC<CartModalProps> = ({onClose}) => {
	const {products, productsForOrder, setProductsAmountForOrderById} = useContext(ProductsContext)
	let sum = 0;
	let amountOfProducts = 0;
	const productsList = Object.entries(productsForOrder).map(([id, amount]) => {
		const {title, price} = products[id];
		const tottal = price * amount;
		amountOfProducts += amount;
		sum += tottal;
		return (
			<div key={id}>
				{title}: ${price} X{amount} ${tottal}
				<Button onClick={() => setProductsAmountForOrderById(id, (amount) => amount + 1)}>
					<PlusCircleIcon className='size-6'/>
				</Button>
				<Button onClick={() => setProductsAmountForOrderById(id, (amount) => amount - 1)}>
					<MinusCircleIcon className='size-6'/>
				</Button>
				<Button onClick={() => setProductsAmountForOrderById(id)}>
					<TrashIcon className='size-6'/>
				</Button>
			</div>
		)
	})
	console.log('CartModal render')
	return (
		<>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">
					Your Orders
				</h2>
				<button onClick={onClose} className="text-gray-500 hover:text-gray-700">
					&times;
				</button>
			</div>
			<div className="mb-4">
				{productsList.length === 0 ? "No Orders" : (
					<>
						{productsList}
						<div>
							<p>Sum: ${sum}</p>
							{
								amountOfProducts >= 5 && (
									<>
										<p>Discount: ${sum * .1}(10%)</p>
										<p>Tottal sum: ${sum * .9}</p>
									</>
								)
							}
						</div>
					</>
				)}
			</div>
		</>
	)
}

export default CartModal