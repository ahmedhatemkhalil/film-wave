import React from "react";
import { createPortal } from "react-dom";
import NavItems, { menuItems } from "./NavItems";

function MobileMenuPortal() {
  return createPortal(
    <>
      <ul className="  top-24 fixed z-50 w-full h-80 md:hidden bg-black text-gray-400 p-10 shadow-lg mt-4 rounded-md text-xl opacity-100 translate-x-0 transition-all duration-300 ease-in-out">
        {menuItems.map((item, index) => (
          <NavItems key={index} {...item} />
        ))}
      </ul>
    </>,
    document.getElementById("portal-root")
  );
}

export default MobileMenuPortal;
