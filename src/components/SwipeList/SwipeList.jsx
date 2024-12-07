import React from "react";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import defaultPhoto from "../../assets/image-placeholder.png";
import clsx from "clsx";
import "react-loading-skeleton/dist/skeleton.css";

const sharedClasses =
  "movie  flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-8 ";
const detailsSpecificClasses = " pb-32";
const swipeSpecificClasses = "pb-8 mt-3";

function SwipeList({ data, mediaType, type, isLoading }) {
  console.log("swipe re-rendered");

  const specificClasses = clsx([
    sharedClasses,
    (type = "details" ? detailsSpecificClasses : swipeSpecificClasses),
  ]);
  const getPosterTitle = (poster) => poster.title || poster.name || "Untitled";



  return (
    <>
      <div className={specificClasses}>
        {data?.map(
          ({ id, media_type, poster_path, title, vote_average, name }) => {
            return (
              <Link key={id} to={`/details/${media_type || mediaType}/${id}`}>
                <div className="  poster    min-w-48 h-72 cursor-pointer flex-shrink-0 mb-14  relative group">
                  <img
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/original${poster_path}`
                        : defaultPhoto
                    }
                    alt={getPosterTitle({ title, name })}
                    className=" w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="shadow-layer absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition duration-300"></div>
                  {/* Rating  */}
                  <Rating rate={vote_average} type="swipe" />
                  <div className="poster-details text-white ">
                    <h2 className=" text-lg sm:text-xl w-full  break-words  whitespace-break-spaces  text-white mt-4  ">
                      {getPosterTitle({ title, name })}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          }
        )}
      </div>
    </>
  );
}

export default React.memo(SwipeList);
