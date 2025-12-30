import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import AppButton from "../common/button/Button";

export interface IProductCard {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  onAdd: () => void;
  className?: string;
}

const ProductCard: React.FC<IProductCard> = ({
  title, 
  description, 
  imageUrl, 
  price, 
  onAdd,
  className = ""
}) => {
  return (
    <div className={`rounded overflow-hidden shadow-lg bg-white m-4 ${className}`}>
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
          <AppButton
            icon={<ShoppingCartIcon className="size-5 mr-2" />}
            onClick={onAdd}
            type='button'
          >
            Add
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
