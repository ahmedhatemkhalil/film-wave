import React from "react";
import { NavLink } from "react-router-dom";

import { Home, Film, Tv } from "react-feather";

export const menuItems = [
  {
    icon: <Home size={30} className="mr-2" strokeWidth={3} />,
    label: "Home",
    link: "/",
  },
  {
    icon: <Tv size={30} className="mr-2" strokeWidth={3} />,
    label: "Tv Shows",
    link: "/tv",
  },
  {
    icon: <Film size={30} className="mr-2" strokeWidth={3} />,
    label: "Movies",
    link: "/movies",
  },
];
function NavItems({ icon, label, link }) {
  return (
    <li className="px-3 list-none">
      <NavLink
        className={({ isActive }) =>
          `flex items-center p-6 md:p-0 hover:text-white ${
            isActive ? "text-white" : "text-gray-400"
          } `
        }
        to={link}
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
}

export default NavItems;
