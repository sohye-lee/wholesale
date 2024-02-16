'use client';
import { createContext, useContext, useState } from 'react';
import { NotificationMode, NotificationProps } from '@lib/types';
import Notification from '../components/UI/notification/page';

export const NotificationContext = createContext({
  notification: {
    mode: 'info',
    timeout: 5,
    message: '',
    handleClose: () => {},
  },
  close: () => {},
  notify: (alert: NotificationProps) => {},
});

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = {
    mode: 'info' as NotificationMode,
    timeout: 0,
    message: '',
    handleClose: () => {},
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [notification, setNotification] =
    useState<NotificationProps>(initialState);
  const notify = (alert: NotificationProps) => {
    setNotification(alert);
  };
  const close = () => {
    setNotification(initialState);
  };
  return (
    <NotificationContext.Provider value={{ notification, close, notify }}>
      {notification.message.length > 0 && (
        <Notification
          message={notification.message || ''}
          mode={notification.mode}
          timeout={5}
          handleClose={close}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const initialState = {
    mode: 'info' as NotificationMode,
    timeout: 0,
    message: '',
    handleClose: () => {},
  };
  const [notification, setNotification] =
    useState<NotificationProps>(initialState);
  const { notify, close } = useContext(NotificationContext);

  const addNotification = (notification: NotificationProps) => {
    setNotification(notification);
  };

  const closeNotification = () => {
    setNotification(initialState);
  };

  return { notify: addNotification, close: closeNotification };
};
