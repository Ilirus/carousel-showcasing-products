import { type ButtonHTMLAttributes, type FC } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    isFBA?: boolean
    isFilled?: boolean
    isReverse?: boolean
}

const Button: FC<ButtonProps> = ({
    children,
    className = '',
    isFBA,
    isFilled,
    type = 'button',
    isReverse,
    disabled,
    ...props
}) => {
    const generateClasses = () => {
        let classes = ''
        if (disabled) {
            classes += 'cursor-not-allowed '
            if (isFilled) {
                classes += 'bg-gray-700 '
            }
        } else {
            classes += 'cursor-pointer '
            if (isFilled && isReverse) {
                classes += 'bg-white hover:bg-yellow-400 '
            } else if (isFilled && !isReverse) {
                classes += 'bg-gray-950 hover:bg-black hover:text-yellow-400 '
            } else if (!isFilled && !isReverse) {
                classes += 'hover:bg-black hover:text-yellow-400 '
            } else {
                classes += 'hover:bg-amber-400 hover:text-gray-950 '
            }
        }
        if (isFilled && !isReverse) {
            classes += 'text-white '
        }
        if (!isFilled && isReverse) {
            classes += 'text-yellow-400 '
        }
        if (isFBA || !isFilled) {
            classes += 'p-2 rounded-full'
        } else {
            classes += 'px-4 py-2 rounded-lg'
        }
        return classes
    }
    return (
        <button
            type={type}
            disabled={disabled}
            className={`
                inline-flex w-fit items-center justify-center text-md font-medium
                border border-transparent
                transition-colors duration-300 ease-in-out ${generateClasses()} ${className}
            `}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
