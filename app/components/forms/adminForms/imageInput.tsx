import React, { InputHTMLAttributes, ReactNode } from "react";

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}
export default function ImageInput({
  id,
  onChange,
  children,
  ...rest
}: ImageInputProps) {
  if (children) rest.hidden = true;
  else rest.hidden = false;

  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="file"
        onChange={onChange}
        accept="image/*"
        {...rest}
      />
      <div className="w-20 h-20 flex items-center justify-center border border-gray-600 cursor-pointer">
        {children}
      </div>
    </label>
  );
}
