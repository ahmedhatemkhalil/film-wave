import React from "react";
function BackdropCover({ backgroundCover, poster }) {
  const backgroundImage = `url('https://image.tmdb.org/t/p/original/${
    backgroundCover || poster
  }')`;

  return (
    <>
      <div
        style={{ backgroundImage }}
        className={`  relative h-[65vh] bg-center bg-cover  `}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 z-30 w-full h-full bg-black bg-opacity-10 "></div>

        {/* Gradient overlay */}
        <div className="absolute bg-custom-grad inset-0 z-30 w-full h-full"></div>
      </div>
    </>
  );
}

export default BackdropCover;
