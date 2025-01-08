import { User, UserNavItem } from "../types/sidebar"

export const userNavConfig = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/01.png",
  } as User,
  items: [
    {
      id: "profile",
      title: "Profile",
      href: "/profile",
    },
    {
      id: "settings",
      title: "Settings",
      href: "/settings",
    },
    {
      id: "logout",
      title: "Logout",
      onClick: () => {
        // Add logout logic here
      },
    },
  ] as UserNavItem[],
}
