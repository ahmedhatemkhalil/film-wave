import React from "react";
import { ChevronRight } from "react-feather";
import SwipeList from "../SwipeList/SwipeList";
function CategorySection({  rate , category, data, showButton = true }) {
  return (
    <>
      <div className="trending-movies text-white  ">
        <div className="caption flex justify-between items-center  ">
          <h2> {category} </h2>
          {showButton && (
            <div className="group">
              <button className=" text-xl text-center  rounded-full   flex items-center justify-center   group-hover:text-main-color transition-all ease-in-out duration-300">
                View More
                <ChevronRight size={30} />
              </button>
            </div>
          )}
        </div>
      </div>
      <SwipeList  data={data} />
    </>
  );
}

export default CategorySection;
