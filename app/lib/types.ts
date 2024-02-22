// import { Icon, IconNode } from '@tabler/icons-react';

import { IconProps } from "@tabler/icons-react";
import { Schema } from "mongoose";
import { ForwardRefExoticComponent, RefAttributes } from "react";

// UI Component props
export interface DropdownItemProps {
  link: string;
  text: string;
  dropdownIcon?: ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & RefAttributes<SVGSVGElement>
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
  mode: "CTA" | "save" | "success" | "danger" | "neutral";
  size: "xsmall" | "small" | "medium" | "large";
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
  role: "admin" | "user";
  avatar?: { url: string; id: string };
  verified: boolean;
}

export interface SessionUserProfile {
  _id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  avatar?: { url: string; id: string };
  verified: boolean;
}

export interface ProductDocument extends Document {
  title: string;
  thumbnail?: string;
  description?: string;
  price: {
    mrp?: number;
    salePrice: number;
    saleOff?: number;
  };
  quantity: number;
  category?: {
    type: Schema.Types.ObjectId;
    ref: "Category";
  };
  collection?: {
    type: Schema.Types.ObjectId;
    ref: "Collection";
  };
}

export interface Product {
  _id: string;
  title: string;
  thumbnail?: string;
  description?: string;
  price: {
    mrp?: number;
    salePrice: number;
    saleOff?: number;
  };
  quantity: number;
  category?: string;
  collection?: string;
}

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
export type NotificationMode = "info" | "success" | "error" | "warning";
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
  subject: "verification" | "forgot-password" | "password-changed";
  linkUrl?: string;
}
