import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
    children,
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}) => {
    const iconElement = icon ? (
        <span className="flex items-center justify-center">
            {icon}
        </span>
    ) : null;

    const buttonContent = (
        <>
            {iconPosition === 'left' && iconElement}
            {children && <span className="mx-2">{children}</span>}
            {iconPosition === 'right' && iconElement}
        </>
    );

    return (
        <button
            className={`
                inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium 
                transition-colors duration-150 ease-in-out
                ${props.disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}
                ${className}
            `}
            {...props}
        >
            {buttonContent}
        </button>
    );
};

export default Button;
