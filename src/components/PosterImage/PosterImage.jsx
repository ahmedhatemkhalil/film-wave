import React from "react";
const sharedClasses = "second w-[15rem] lg:w-[18rem] xl:w-[20rem] rounded-md ";
const detailsSpecificClasses = "h-[480px] w-[300px] hidden max-975:block";
const swipeSpecificClasses = " pr-10 hidden md:block ";
function PosterImage({ classes , poster }) {
  const specificClasses =
    classes === "details" ? detailsSpecificClasses : swipeSpecificClasses;
  return (
    <>
      <div className={`${sharedClasses} ${specificClasses}`}>
        <img src={poster} alt="" className="w-full  max-w-xs md:max-w-md " />
      </div>
    </>
  );
}

export default PosterImage;
