import React from 'react';

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'; 
  variant?: 'primary' | 'secondary' | 'outline';
}

const BaseButton: React.FC<BaseButtonProps> = ({
  onClick,
  children,
  className = '',
  size = 'md',
  variant = 'primary',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-[117px] h-[49px] text-[16px]',
    md: 'w-[200px] h-[56px] text-[18px]',
    lg: 'w-[263px] h-[60px] text-[20px]',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-[#9378FF] text-white hover:bg-[#846ce5]',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    outline: 'border border-[#9378FF] text-[#9378FF] hover:bg-[#F3E8FF]',
  };

  return (
    <button
      onClick={onClick}
      className={`btn-primary ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
