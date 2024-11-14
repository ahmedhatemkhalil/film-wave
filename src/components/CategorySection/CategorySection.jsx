import React from 'react'
import { ChevronRight } from "react-feather";
import poster from '../../assets/poster1.jpeg'
function CategorySection({category}) {
  return (
    <>
     <div className="trending-movies text-white  ">
          <div className="caption flex justify-between items-center mb-8 ">
            <h2> {category} </h2>
            <div className="group">
              <button className=" text-xl text-center  rounded-full   flex items-center justify-center   group-hover:text-main-color transition-all ease-in-out duration-300">
                View More
                <ChevronRight size={30} />
              </button>
            </div>
          </div>
        </div>
        <div className="movie flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-8 ">
          {/* Placeholder movie items to fetch data */}
          {[...Array(11)].map((_, index) => (
            <div
              key={index}
              className="poster w-44 h-64 cursor-pointer flex-shrink-0 mb-14  relative group"
            >
              <img
                src={poster}
                alt="Movie Poster"
                className=" w-full h-full object-cover"
              />
              <div className="shadow-layer absolute inset-0 bg-black opacity-35 group-hover:opacity-60 transition duration-300"></div>
              <div className="rating-circle absolute bottom-2 left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className=" text-white text-sm font-semibold">7.3</span>
              </div>
              <div className="poster-details ">
                <h2 className=" text-white mt-4 "> Harry Potter </h2>
              </div>
            </div>
          ))}
        </div>
    
    </>
  )
}

export default CategorySection