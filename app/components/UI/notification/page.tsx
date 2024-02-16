'use client';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconX } from '@tabler/icons-react';
import { classNames, icons, textColor } from './notificationStyles';
import { NotificationProps } from '@/app/lib/types';

export default function Notification({
  mode = 'info',
  message = '',
  timeout = 0,
  handleClose,
}: NotificationProps) {
  useEffect(() => {
    if (timeout > 0 && handleClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, timeout * 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    message?.length && (
      <div className="fixed bg-[rgba(0,0,0,.1)] w-screen h-screen flex items-center justify-center">
        <div
          className={`bg-white px-8 py-6 relative flex items-center justify-center gap-3 ${classNames[mode]}`}
        >
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center hover:bg-stone-100"
          >
            <IconX width={16} className="text-stone-700" />
          </button>
          {icons[mode]}
          <span className="text-sm">{message}</span>
        </div>
      </div>
    )
  );
}
