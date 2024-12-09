import React from "react";
import clsx from "clsx";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const sharedClasses = "rating-circle  flex items-center justify-center";
const detailsSpecificClasses = "w-12 h-12";
const swipeSpecificClasses =
  "w-8 h-8 bottom-2 left-2 absolute  opacity-0 group-hover:opacity-100 transition duration-300";

function Rating({ type, rate }) {
  const firstNumberAfterDot = Math.floor(rate * 10) % 10;
  const truncatedRating = Math.floor(rate * 10) / 10;
  const roundedRate =
    firstNumberAfterDot >= 0
      ? truncatedRating.toFixed(1)
      : truncatedRating.toFixed(1);

  if (roundedRate <= 0 || roundedRate >= 10) {
    return null;
  }

  const specificClasses = clsx({
    sharedClasses,
    [swipeSpecificClasses]: type === "swipe",
    [detailsSpecificClasses]: type !== "swipe",
  });
  return (
    <>
      <div className={specificClasses}>
        <CircularProgressbarWithChildren
          value={rate || 0}
          styles={buildStyles({
            pathColor: "#0080ff",
            trailColor: "#0f0f0f70",
          })}
          maxValue={10}
        >
          <span className=" text-white text-sm font-semibold">
            {" "}
            {roundedRate}{" "}
          </span>
        </CircularProgressbarWithChildren>
      </div>
    </>
  );
}

export default Rating;