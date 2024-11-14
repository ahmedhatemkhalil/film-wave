import React from "react";
import { Search, Menu, X } from "react-feather";
import { Link } from "react-router-dom";
import logo from "../../../src/assets/logo.png";
import NavItems, { menuItems } from "./NavItems";
import MobileMenuPortal from "./MobileMenuPortal";

function NavBar() {
  const [isToggle, setToggle] = React.useState(false);

  return (
    <>
      <nav>
        <div className=" px-4 md:px-16 py-3 fixed top-0 w-full left-0 shadow-lg z-[100]  ">
          {/* nav container */}
          <div className="  py-2 flex items-center justify-between ">
            {/* menu icon that be hidden on mobile size only */}
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setToggle(!isToggle)}
            >
              {isToggle ? (
                <X
                  size={40}
                  className="transition-all duration-300 ease-in-out"
                />
              ) : (
                <Menu
                  size={40}
                  className="transition-all duration-300 ease-in-out"
                />
              )}
            </button>
            {/* Logo */}
            <Link to={"/"}>
              <img
                src={logo}
                alt="logo"
                className="w-36 h-auto object-contain"
              />
            </Link>
            {/* Desktop Menu Items */}
            <ul className="hidden md:flex text-gray-400 text-xl">
              {menuItems.map((item, index) => (
                <NavItems key={index} {...item} />
              ))}
            </ul>

            {/* Search Icon */}
            {/* <Search size={40}  /> */}

            {/* Mobile Menu */}
            {isToggle && <MobileMenuPortal />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
