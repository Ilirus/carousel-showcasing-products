import React, { type PropsWithChildren } from 'react'

export interface BadgeProps {
    className?: string
    count?: number
}

const Badge: React.FC<PropsWithChildren<BadgeProps>> = ({
    children,
    className = '',
    count = 0,
}) => {
    return (
        <div className='relative'>
            {count > 0 && (
                <span
                    className={`
                        absolute -top-2 -right-2 h-6 w-6 rounded-full text-white bg-gray-950/90
                        flex items-center justify-center text-xs font-bold border-2 border-white/90
                        ${className}
                    `}
                >
                    {count}
                </span>
            )}
            {children}
        </div>
    )
}

export default Badge
