// import { Icon, IconNode } from '@tabler/icons-react';

import { IconProps } from '@tabler/icons-react';
import { Schema, Document } from 'mongoose';
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

export interface ButtonType {
  children: React.ReactNode;
  mode: 'CTA' | 'save' | 'success' | 'danger' | 'neutral';
  size: 'xsmall' | 'small' | 'medium' | 'large';
  link?: string;
  addClass?: string;
  loading?: boolean;
  disabled?: boolean;
  [key: string]: any;
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

export interface SessionUserProfile {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: { url: string; id: string };
  verified: boolean;
}

export interface ProductDocument extends Document {
  title: string;
  description?: string;
  bulletpoints?: string[];
  thumbnail?: { url: string; id: string };
  images?: { url: string; id: string }[];
  price: {
    base: number;
    discounted: number;
  };
  sale: number;
  quantity: number;
  // rating?: number;
  categoryId: {
    type: Schema.Types.ObjectId;
    ref: 'Category';
  };
  collectionId: {
    type: Schema.Types.ObjectId;
    ref: 'Collection';
  };
}

export interface Product {
  _id: string;
  title: string;
  thumbnail?: string;
  description?: string;
  bulletpoints?: string;
  price: {
    base?: number;
    discounted: number;
    sale?: number;
  };
  quantity: number;
  categoryId?: string;
  collectionId?: string;
  images?: string[];
}

export interface ProductForm {
  title: string;
  description: string;
  thumbnail: string;
  images?: string[];
  bulletpoints: string[];
  base: number;
  discounted: number;
  quantity: number;
  categoryId: string;
  collectionId: string;
}

export interface NewProductData {
  title: string;
  description: string;
  thumbnail?: File;
  images?: File[];
  bulletpoints: string[];
  base: number;
  discounted: number;
  quantity: number;
  categoryId: string;
  collectionId: string;
}

// export interface ProductImageDocument extends Document {
//   id: string;
//   url?: string;
//   product: {
//     type: Schema.Types.ObjectId;
//     ref: 'Product';
//   };
// }

// export interface ProductImage {
//   _id: string;
//   id: string;
//   url?: string;
//   product: string;
// }

export interface Category {
  _id: string;
  name: string;
}

export interface CategoryDocument extends Document {
  name: string;
}

export interface Collection {
  _id: string;
  name: string;
  description: string;
}
export interface CollectionDocument extends Document {
  name: string;
  description: string;
}

// other
export type NotificationMode = 'info' | 'success' | 'error' | 'warning';
export interface NotificationProps {
  mode: NotificationMode;
  message: string;
  timeout: number;
  handleClose: () => void;
}

export type Profile = {
  name: string;
  email: string;
};

export interface EmailOptions {
  profile: Profile;
  subject: 'verification' | 'forgot-password' | 'password-changed';
  linkUrl?: string;
}
