import React from "react";

function HeroBanner({ bgImage }) {
  const backGroundImage = bgImage === "series" ? "bg-series" : "bg-movies";
  return (
    <>
      <div
        className={` ${backGroundImage} relative h-[65vh] bg-center bg-cover bg-img `}
      >
        <div className="absolute inset-0 z-30 w-full h-full bg-black bg-opacity-75"></div>
        <div className="absolute bg-custom-grad inset-0 z-30 w-full h-full"></div>
      </div>
    </>
  );
}

export default HeroBanner;
