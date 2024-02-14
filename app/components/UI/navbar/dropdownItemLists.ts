import { DropdownItemProps } from "@/app/lib/types";
import {
  IconUser,
  IconList,
  IconLogout2,
  IconShoppingBagCheck,
  IconDashboard,
  IconGraph,
} from "@tabler/icons-react";

export const catalogDropdown: DropdownItemProps[] = [
  { link: "/bracelets", text: "Bracelets" },
  { link: "/necklaces", text: "Necklaces" },
  { link: "/sets", text: "Set" },
];

export const profileDropdown: DropdownItemProps[] = [
  { link: "/profile", text: "Profile", dropdownIcon: IconUser, isAdmin: false },
  {
    link: "/admin/dashboard",
    text: "Dashboard",
    dropdownIcon: IconGraph,
    isAdmin: true,
  },
  {
    link: "/orders",
    text: "Orders",
    dropdownIcon: IconShoppingBagCheck,
    isAdmin: false,
  },
  // {
  //   link: '/singout',
  //   text: 'Logout',
  //   dropdownIcon: IconLogout2,
  //   isAdmin: false,
  // },
];
