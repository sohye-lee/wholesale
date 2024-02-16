import {
  IconCheck,
  IconInfoCircle,
  IconAlertCircle,
  IconAlertTriangle,
} from '@tabler/icons-react';

export const classNames = {
  info: 'text-blue-800 border border-gray-200 border-t-3 border-t-blue-300',
  success:
    'text-emerald-800 border border-gray-200 border-t-3 border-t-emerald-300',
  error: 'text-amber-800 border border-gray-200 border-t-3 border-t-amber-300',
  warning: 'text-red-800 border border-gray-200 border-t-3 border-t-red-500',
};

export const icons = {
  info: <IconInfoCircle />,
  success: <IconCheck />,
  error: <IconAlertCircle />,
  warning: <IconAlertTriangle />,
};

export const textColor = {
  info: 'text-blue-500',
  success: 'text-emerald-500',
  error: 'text-amber-500',
  warning: 'text-red-500',
};
