import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function Layout() {
  return (
    <>
      <NavBar />
      {/* Make the content scrollable */}
        <Outlet />
      {/* Footer stays at the bottom */}
      <Footer />
    </>
  );
}

export default Layout;
