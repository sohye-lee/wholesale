import Link from 'next/link';
import React from 'react';
import { IconRotate } from '@tabler/icons-react';
import { ButtonType } from '@/app/lib/types';

// type ButtonTypeExpanded = {
//   children: React.ReactNode;
//   mode: 'CTA' | 'save' | 'success' | 'danger' | 'neutral';
//   size: 'xsmall' | 'small' | 'medium' | 'large';
//   link?: string;
//   addClass?: string;
//   loading?: boolean;
//   disabled?: boolean;
//   [key: string]: any;
// };

const Button = ({
  children,
  mode,
  size,
  link = '',
  addClass = '',
  loading = false,
  disabled = false,
  ...rest
}: ButtonType) => {
  // const { children, mode, size, link, addClass, loading, disabled, ...rest } = {
  //   ...props,
  //   link: undefined,
  //   addClass: undefined,
  //   loading: undefined,
  //   disabled: undefined,
  // };
  let modeClass = '';
  let sizeClass = '';
  switch (mode) {
    case 'CTA':
      modeClass = 'bg-stone-900 text-white';
      break;
    case 'save':
      modeClass = 'bg-emerald-500 text-white';
      break;
    case 'success':
      modeClass = 'bg-amber-700 text-white';
      break;
    case 'danger':
      modeClass = 'bg-red-500 text-white';
      break;
    case 'neutral':
      modeClass = 'bg-stone-100 border border-stone-800 text-stone-800';
      break;
    default:
      modeClass = 'bg-stone-900 text-white';
      break;
  }

  switch (size) {
    case 'xsmall':
      sizeClass = 'px-[6px] py-[2px] text-[12px]';
      break;
    case 'small':
      sizeClass = 'px-3 py-2 text-[12px]';
      break;
    case 'medium':
      sizeClass = 'px-4 py-4 text-xs';
      break;
    case 'large':
      sizeClass = 'px-5 py-5 text-sm';
      break;
    default:
      sizeClass = 'px-3 py-2 text-[12px]';
      break;
  }
  return (
    <>
      {!link ? (
        <button
          {...rest}
          type="submit"
          disabled={disabled}
          className={`transition-all px-4 py-2 spacing-2 cursor-pointer hover:bg-stone-600 hover:text-white flex items-center justify-center uppercase ${sizeClass} ${modeClass} ${addClass} ${
            disabled && 'bg-stone-600'
          }`}
        >
          {loading ? (
            <IconRotate width={20} className="text-white animate-spin" />
          ) : (
            children
          )}
        </button>
      ) : (
        <Link
          href={link}
          className={`transition-all px-4 py-2 spacing-2 cursor-pointer hover:bg-stone-600 hover:text-white flex items-center justify-center uppercase ${sizeClass} ${modeClass} ${addClass}`}
        >
          {loading ? (
            <IconRotate width={20} className="text-white animate-spin" />
          ) : (
            children
          )}
        </Link>
      )}
    </>
  );
};

export default Button;
