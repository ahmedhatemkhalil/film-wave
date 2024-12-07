import React, { useState } from "react";
import { Menu, X } from "react-feather";
import { Link } from "react-router-dom";
import logo from "../../../src/assets/logo.png";
import NavItems, { menuItems } from "../NavBar/NavItems";
import useScroll from "../../customHocks/useScroll";
import { Dialog, DialogPanel } from "@headlessui/react";

function NavBar() {
  const isScrolled = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav>
        <div
          className={`${
            isScrolled ? "bg-black" : "duration-300 transition-all"
          } px-4 md:px-16 py-5 fixed top-0 w-full left-0 z-[100]`}
        >
          {/* Nav container */}
          <div className="py-2 flex items-center justify-between ">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden  cursor-pointer text-white"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <Menu
                size={40}
                className="transition-all duration-300 ease-in-out"
              />
            </button>

            {/* Mobile Menu Dialog */}
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="relative    block md:hidden z-[200]"
            >
              <div
                className="fixed inset-0  bg-black/70"
                aria-hidden="true"
              ></div>
              <div className="fixed inset-0  flex items-start justify-start transform transition-transform duration-300">
                <DialogPanel className=" pb-20 flex flex-col justify-between    bg-black text-gray-400 p-10 h-full shadow-lg">
                  <ul className="   flex flex-col gap-4">
                    {menuItems.map((item, index) => (
                      <li key={index} onClick={() => setIsOpen(false)}>
                        <NavItems {...item} />
                      </li>
                    ))}
                  </ul>
                  <button
                    className="  w-full flex items-center justify-center  text-white bg-red-600  py-2 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={20} className=" mr-1" />
                    Dismiss
                  </button>
                </DialogPanel>
              </div>
            </Dialog>

            {/* Logo */}
            <Link to={"/"}>
              <img
                src={logo}
                alt="App Logo"
                className="w-28 md:w-36 h-auto object-contain"
              />
            </Link>

            {/* Desktop Menu Items */}
            <ul className="hidden md:flex gap-8  text-xl">
              {menuItems.map((item, index) => (
                <NavItems key={index} {...item} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
