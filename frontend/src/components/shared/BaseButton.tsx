import React from 'react';

const BaseButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ onClick, children, className, ...props }) => (
  <button
    onClick={onClick}
    className={`btn-primary ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default BaseButton;
