import "./Header.css";
import Gift from '../../assets/gift.svg?react';
import Bag from '../../assets/bag.svg?react'

export const Header = () => {
  return (
	<div className="flex min-h-18.75 justify-between items-center py-5 px-10 bg-yellow-400">
		<div className="cursor-default">
			<div className="flex justify-between items-center text-4xl font-bold">
				Gift Store
				<Gift className="size-9 ml-1.5"/>
			</div>
			<span className="text-xl italic">
				Find something special
			</span>
		</div>
		<button 
			type="button" 
			onClick={() => {}} 
			className="
				flex text-lg justify-between items-center cursor-pointer bg-black font-bold rounded-xl text-yellow-400 
				px-4 py-2 transition delay-250 duration-500 ease-in-out hover:ring-3 hover:bg-yellow-400 hover:text-black
			"
		>
			<Bag className="size-6 mr-1.5"/>
			Buy Now
		</button>
	</div>
  )
}
