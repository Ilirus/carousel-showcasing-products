import './Badge.css'
import React, { type PropsWithChildren } from 'react'

export interface IBadgeProps {
	color?: 'string'
	textColor?: 'string'
	count?: number
}

const Badge: React.FC<PropsWithChildren<IBadgeProps>> = ({
	children,
	color = 'bg-blue-100',
	textColor = 'text-blue-800',
	count = 0
}) => {
  return (
	<div className='relative'>
		{count > 0 && (
			<span className={`absolute -top-2 -right-2 h-5 w-5 ${color} rounded-full flex items-center justify-center text-xs font-bold ${textColor} border-2 border-white`}>
				{count}
			</span>
      	)}
		{children}
	</div>
  )
}

export default Badge