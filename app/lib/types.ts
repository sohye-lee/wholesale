// import { Icon, IconNode } from '@tabler/icons-react';

import { IconProps } from '@tabler/icons-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

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
