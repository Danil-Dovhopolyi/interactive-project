import React from 'react';
import { ButtonVariant } from '../../types/GridLayout/enums.ts';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const buttonStyles = {
  [ButtonVariant.Primary]:
    'bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-400',
  [ButtonVariant.Secondary]:
    'bg-gray-500 text-white hover:bg-gray-700 focus:ring-gray-400',
  [ButtonVariant.Danger]:
    'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
  [ButtonVariant.Success]:
    'bg-green-500 text-white hover:bg-green-700 focus:ring-green-400',
};

const GridButtonAction: React.FC<ButtonProps> = ({
  variant = ButtonVariant.Primary,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none focus:ring-2';
  const variantStyles = buttonStyles[variant];
  const buttonClassNames = `${baseStyles} ${variantStyles} ${className || ''}`;

  return (
    <button className={buttonClassNames} {...props}>
      {children}
    </button>
  );
};

export { GridButtonAction, ButtonVariant };
