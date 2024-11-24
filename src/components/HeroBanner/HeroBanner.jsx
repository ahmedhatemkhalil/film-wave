import React from "react";
import seriesCover from "../../assets/cover22.jpg";
import movieCover from "../../assets/cover2.jpg";

function HeroBanner({ kind }) {
  const backgroundImage = kind === "movie" ? movieCover : seriesCover;
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        className={`  relative h-[65vh] bg-center bg-cover  `}
      >
        <div className="absolute inset-0 z-30 w-full h-full bg-black bg-opacity-75 "></div>
        <div className="absolute bg-custom-grad inset-0 z-30 w-full h-full"></div>
      </div>
    </>
  );
}

export default HeroBanner;
