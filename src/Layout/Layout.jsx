import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className=" pb-16 md:pb-0 ">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
