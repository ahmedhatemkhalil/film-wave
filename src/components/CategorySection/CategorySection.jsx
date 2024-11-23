import React from "react";
import { ChevronRight } from "react-feather";
import SwipeList from "../SwipeList/SwipeList";
import { useNavigate } from "react-router-dom";
function CategorySection({ category, data, showButton = true , mediaType }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    let path;

    if (category === "Trending Movies") {
      path = "/movies/trending";
    } else if (category === "Trending TV Series") {
      path = "/tv/trending";
    } else if (category === "Upcoming Movies") {
      path = "/movies/upcoming";
    } else if (category === "TV Series Airing Today") {
      path = "/tv/airing_today";
    }
    navigate(path);
  };
  return (
    <>
      <div className="trending-movies text-white  ">
        <div className="caption flex justify-between items-center  ">
          <h2> {category} </h2>
          {showButton && (
            <div className="group">
              <button
                onClick={handleViewMore}
                className=" hover:text-mainColor duration-300 trans text-xl text-center  rounded-full   flex items-center justify-center   group-hover:text-main-color transition-all ease-in-out "
              >
                View More
                <ChevronRight size={30} />
              </button>
            </div>
          )}
        </div>
      </div>
      <SwipeList data={data} mediaType={mediaType} />
    </>
  );
}

export default CategorySection;
