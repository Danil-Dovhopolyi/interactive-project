import React from 'react';
import { ButtonColor } from '../../types/enums.ts';

interface ActionButtonProps {
  onClick: () => void;
  color: ButtonColor;
  label: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  color,
  label,
  disabled = false,
}) => {
  const colors = {
    [ButtonColor.Green]: 'bg-green-500',
    [ButtonColor.Red]: 'bg-red-500',
    [ButtonColor.Blue]: 'bg-blue-500',
  };

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white px-4 py-2 rounded mr-2 ${disabledClass}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ActionButton;
