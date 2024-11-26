import React from "react";
import { ChevronRight } from "react-feather";
import SwipeList from "../SwipeList/SwipeList";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
function CategorySection({
  category,
  data,
  showButton = true,
  mediaType,
  type,
}) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    const PathObject = {
      "Trending Movies": "/movies/trending",
      "Trending TV Series": "/tv/trending",
      "Upcoming Movies": "/movies/upcoming",
      "TV Series Airing Today": "/tv/airing_today",
    };
    const path = PathObject[category];
    if (path) {
      return navigate(path);
    }
  };

  const sharedClasses = " text-white text-sm  sm:text-xl md:text-2xl ";
  const detailsSpecificClasses = " text-xl";
  const swipeSpecificClasses = " mt-3 mb-3 md:mb-10";

  const specificClasses = clsx([
    sharedClasses,
    type === "details" ? detailsSpecificClasses : swipeSpecificClasses,
  ]);

  //
  return (
    <>
      <div className={specificClasses}>
        <div className="caption flex justify-between items-center  ">
          <h2 className=""> {category} </h2>
          {showButton && (
            <div className="group">
              <button
                aria-label="View more content"
                onClick={handleViewMore}
                className=" hover:text-mainColor duration-300 trans text-sm sm:text-xl md:text-2xl text-center  rounded-full   flex items-center justify-center   group-hover:text-main-color transition-all ease-in-out "
              >
                View More
                <ChevronRight size={30} />
              </button>
            </div>
          )}
        </div>
      </div>
      <SwipeList type={type} data={data} mediaType={mediaType} />
    </>
  );
}

export default CategorySection;
