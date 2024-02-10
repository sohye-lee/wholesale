import React from 'react';

interface ContainerProps {
  width?: 'full' | 'container' | 'small';
  bgColor?: string;
  children: React.ReactNode;
}
export default function Container({
  width,
  bgColor,
  children,
}: ContainerProps) {
  return (
    <div
      className={`w-full min-h-[calc(100vh-80px)] flex justify-center py-16 lg:py-20 ${bgColor}`}
    >
      <div
        className={`px-5 w-full ${
          width == 'container' || !width
            ? 'lg:max-w-[1200px] '
            : width == 'small'
            ? 'lg:max-w-[699px]'
            : 'w-full'
        } ${bgColor} `}
      >
        {children}
      </div>
    </div>
  );
}
