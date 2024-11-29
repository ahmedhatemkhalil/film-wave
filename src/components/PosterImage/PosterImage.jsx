import React from "react";
import clsx from "clsx";
import defaultPhoto from "../../assets/image-placeholder.png";
const sharedClasses = "second   lg:w-[18rem] xl:w-[20rem]   rounded-md ";
const detailsSpecificClasses = "h-[480px] w-[300px] hidden max-975:block";
const swipeSpecificClasses = "  hidden md:flex items-center md:w-[35%] ";
function PosterImage({ classes, poster, altName }) {
  const specificClasses = clsx([
    sharedClasses,
    classes === "details" ? detailsSpecificClasses : swipeSpecificClasses,
  ]);
  return (
    <>
      <div className={specificClasses}>
        <img
          src={poster || defaultPhoto}
          alt={`Poster for ${altName}`}
          className="w-full   max-w-xs md:max-w-[17rem] lg:w-full "
        />
      </div>
    </>
  );
}

export default PosterImage;
