import React from "react";

function HeroBanner({ kind }) {
  //show the background base on it's kind a movie or series
  const backgroundImage = kind === "movie" ? " bg-movie-cover" : "bg-tv-cover";
  return (
    <>
      <div
        className={`  relative h-[65vh] bg-center bg-cover ${backgroundImage} `}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 z-30 w-full h-full bg-black bg-opacity-75 "></div>
        {/* dark gradient */}
        <div className="absolute bg-custom-grad inset-0 z-30 w-full h-full"></div>
      </div>
    </>
  );
}

export default HeroBanner;
