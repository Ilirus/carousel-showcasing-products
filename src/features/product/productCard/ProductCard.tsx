import Button from '@components/common/button/Button'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { type FC } from 'react'

export interface ProductCardProps {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    onAdd: () => void;
    className?: string;
}

const ProductCard: FC<ProductCardProps> = ({
    title,
    description,
    imageUrl,
    price,
    onAdd,
    className = '',
}) => {
    return (
        <div className={`flex flex-col h-100 max-w-100 rounded overflow-hidden shadow-md bg-white ${className}`}>
            <div
                className='bg-contain bg-no-repeat bg-center h-[55%] border-b border-gray-300'
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="flex flex-col justify-between flex-1 px-5 py-3 overflow-hidden">
                <div className="flex flex-col flex-1 overflow-hidden mb-3">
                    <h3 className="font-bold text-xl w-full overflow-hidden whitespace-nowrap text-ellipsis mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-700 line-clamp-3 text-ellipsis text-base">
                        {description}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-950">${price.toFixed(2)}</span>
                    <Button
                        title='Add product'
                        isFilled
                        onClick={onAdd}
                        type='button'
                    >
                        <ShoppingCartIcon className="size-6 mr-2" />
                        Add
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
