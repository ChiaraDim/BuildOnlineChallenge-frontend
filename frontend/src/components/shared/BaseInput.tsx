import React from 'react';

const BaseInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, placeholder, className, ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`rounded-lg bg-[#FBEEFF] px-4 py-2 ${className}`}
    {...props}
  />
);

export default BaseInput;