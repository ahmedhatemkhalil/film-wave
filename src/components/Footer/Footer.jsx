import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { movieLists, seriesLists } from "../../data/series and movies lists";

function Footer() {
  return (
    <>
      <footer>
        <div className=" px-16 py-6 md:py-12 relative bg-footer-cover bg-cover bg-center">
          <div className="relative z-50 grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-y-0 lg:gap-x-8">
            <div className="flex flex-col items-center lg:items-start gap-3 md:gap-6">
              <NavLink to="/" aria-label="Go to home page">
                <div className="flex flex-row items-center gap-3 text-white text-3xl md:text-4xl font-medium">
                  <img
                    src={logo}
                    alt="Film Wave logo"
                    className="w-64 h-auto object-contain"
                    loading="lazy"

                  />
                </div>
              </NavLink>
            </div>
            <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
              <div className="flex flex-col items-center lg:items-start gap-1.5 md:gap-3">
                <h2 className="text-2xl md:text-3xl text-white">Movies</h2>
                <ul className="  w-full flex flex-col items-center lg:items-start gap-1 md:gap-2 text-lg md:text-xl text-gray-300">
                  {movieLists.map(({ id, path, text }) => (
                    <li
                      className="hover:text-mainColor duration-300 transition-all"
                      key={id}
                    >
                      <Link aria-label={`Go to ${path} page`} to={path}>
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1.5 md:gap-3">
                <h2 className="text-2xl md:text-3xl text-white">TV Series</h2>
                <ul className="w-full flex flex-col items-center lg:items-start gap-1 md:gap-2 text-lg md:text-xl text-gray-300">
                  {seriesLists.map(({ id, path, text }) => (
                    <li
                      className="hover:text-mainColor duration-300 transition-all"
                      key={id}
                    >
                      <Link aria-label={`Go to ${path} page`} to={path}>
                        {text}{" "}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-30 w-full h-full bg-black bg-opacity-50"></div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
