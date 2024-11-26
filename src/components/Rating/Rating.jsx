import React from "react";
import clsx from "clsx";

const sharedClasses =
  "rating-circle  bg-blue-500 rounded-full flex items-center justify-center";
const detailsSpecificClasses = "w-12 h-12";
const swipeSpecificClasses =
  "w-8 h-8 bottom-2 left-2 absolute  opacity-0 group-hover:opacity-100 transition duration-300";

function Rating({ type, rate }) {
  const roundedRate = rate ? parseFloat(rate?.toFixed(1)) : null;

  const specificClasses = clsx([
    sharedClasses,
    type === "swipe" ? swipeSpecificClasses : detailsSpecificClasses,
  ]);
  return (
    <>
      <div className={specificClasses}>
        <span className=" text-white text-sm font-semibold">
          {" "}
          {roundedRate}{" "}
        </span>
      </div>
    </>
  );
}

export default Rating;
