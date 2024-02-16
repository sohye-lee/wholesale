// import { Icon, IconNode } from '@tabler/icons-react';

import { IconProps } from '@tabler/icons-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

// UI Component props
export interface DropdownItemProps {
  link: string;
  text: string;
  dropdownIcon?: ForwardRefExoticComponent<
    Omit<IconProps, 'ref'> & RefAttributes<SVGSVGElement>
  > | null;
  isAdmin?: boolean;
}

export interface NavbarProps {
  cartItemsCount: number;
}

export interface ProfileInfoProps {
  username?: string;
  avatar?: string;
  isAdmin?: boolean;
}

// Requests

export interface NewUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface EmailVerifyRequest {
  userId: string;
  token: string;
}

export interface PageProps {
  searchParams: { token?: string; userId?: string };
}

export interface SignInCredential {
  email: string;
  password: string;
}

// DB Model Documents
export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'user';
  avatar?: { url: string; id: string };
  verified: boolean;
}

// other
export type NotificationMode = 'info' | 'success' | 'error' | 'warning';
export interface NotificationProps {
  mode: NotificationMode;
  message: string;
  timeout: number;
  handleClose: () => void;
}
