import React from "react";
import { Link, NavLink } from "react-router-dom";

import { Home, Film, Tv } from "react-feather";

export const menuItems = [
  { icon: <Home size={30} className="mr-2" />, label: "Home", link: "/" },
  {
    icon: <Tv size={30} className="mr-2" />,
    label: "Tv Shows",
    link: "/tv-shows",
  },
  {
    icon: <Film size={30} className="mr-2" />,
    label: "Movies",
    link: "/movies",
  },
];
function NavItems({ icon, label, link }) {
  return (
    <li className="px-3">
      <NavLink className="flex items-center p-6 md:p-0 hover:text-white" to={link}>
        {icon}
        {label}
      </NavLink>
    </li>
  );
}

export default NavItems;
