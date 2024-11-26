import React from "react";
import clsx from "clsx";
import defaultPhoto from "../../assets/image-placeholder.png";
const sharedClasses = "second w-[15rem] lg:w-[18rem] xl:w-[20rem] rounded-md ";
const detailsSpecificClasses = "h-[480px] w-[300px] hidden max-975:block";
const swipeSpecificClasses = " pr-10 hidden md:block ";
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
          className="w-full   max-w-xs md:max-w-md "
        />
      </div>
    </>
  );
}

export default PosterImage;
