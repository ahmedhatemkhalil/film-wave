import React from "react";
import { Film, Info } from "react-feather";

function MovieInfo({ movie, handleMoreInfo, handleWatchTrailer }) {
  return (
    <>
      <div className="first  mt-20 md:mt-0  w-full md:w-[65%]   text-white flex flex-col justify-center">
        <div className="mt-5 ">
          <h1 className=" text-2xl sm:text-3xl md:text-5xl font-medium">
            {movie.title || movie.name}
          </h1>
        </div>
        <div className="mt-5">
          <p className="  sm:text-xl max-w-[55rem] text-gray-200 font-medium ">{movie.overview}</p>
        </div>
        {/* Buttons */}
        <div className="buttons flex flex-col tablet:flex-row mt-6  w-full md:min-w-[100%]  lg:w-2/3    ">
          <button
            onClick={() => handleMoreInfo(movie.media_type, movie.id)}
            className=" hover:text-main-color transition-all ease-in-out duration-300 flex items-center justify-center tablet:my-0  border-none text-black py-2 tablet:py-3 px-8 tablet:px-2 tablet:w-[35%] md:w-2/5   lg:w-[30%]    text-center my-1 cursor-pointer bg-white "
            aria-label={`More information about ${movie.title || movie.name}`}
          >
            <Info size={30} className="mr-4" />
            More Info
          </button>
          <button
            onClick={() =>
              handleWatchTrailer(movie.media_type, movie.id, movie)
            }
            aria-label={`Watch trailer for ${movie.title || movie.name}`}
            className=" flex items-center justify-center my-3 tablet:my-0  py-2 tablet:w-[45%] md:w-3/5 lg:w-[40%]   pl-7 pr-3    border-none text-black   text-center  tablet:ml-5  cursor-pointer bg-white opacity-50 "
          >
            <Film size={30} className="mr-4" />
            Watch Trailer
          </button>
        </div>
      </div>
    </>
  );
}

export default MovieInfo;
