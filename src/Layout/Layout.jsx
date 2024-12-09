import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function Layout() {
  return (
    <>
      <div className=" pb-4 md:pb-0 ">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
