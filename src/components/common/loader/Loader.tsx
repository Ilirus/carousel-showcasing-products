import { type FC } from 'react'

export interface LoaderProps {
    className?: string
    size?: number
}

const Loader: FC<LoaderProps> = ({
    className = '',
    size = 6,
}) => {
    return (
        <svg
            style={{ '--size': `calc(var(--spacing) * ${size})` }}
            className={`animate-spin h-(--size) w-(--size) ${className}`}
            fill='initial'
            viewBox="0 0 100 100"
            role="img"
        >
            <circle
                fill="none"
                strokeWidth="10"
                className="stroke-current opacity-40"
                cx="50"
                cy="50"
                r="40"
            />
            <circle
                fill="none"
                strokeWidth="10"
                className="stroke-current"
                strokeDasharray="250"
                strokeDashoffset="210"
                cx="50"
                cy="50"
                r="40"
            />
        </svg>
    )
}

export default Loader
