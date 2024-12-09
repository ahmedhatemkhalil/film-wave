import React from "react";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import defaultPhoto from "../../assets/image-placeholder.png";
import clsx from "clsx";
import { ChevronLeft } from "react-feather";
import { ChevronRight } from "react-feather";

const sharedClasses =
  "movie mb-10  flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-8  ";
const detailsClasses = " pb-12";
const swipeClasses = "pb-8 mt-3";

function SwipeList({ data, mediaType, type }) {
  const specificClasses = clsx([
    sharedClasses,
    type === "details" ? detailsClasses : swipeClasses,
  ]);
  const getPosterTitle = (poster) => poster.title || poster.name || "Untitled";

  const containerRef = React.useRef(null);

  const swipeLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };
  const swipeRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className=" relative">
        <button
          onClick={swipeLeft}
          className=" absolute left-0 top-28  z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
        >
          <ChevronLeft size={30} />
        </button>
        <div ref={containerRef} className={specificClasses}>
          {data?.map(
            ({ id, media_type, poster_path, title, vote_average, name }) => {
              const postTitle = getPosterTitle({ title, name });
              return (
                <Link key={id} to={`/details/${media_type || mediaType}/${id}`}>
                  <div className="  poster     min-w-48 h-72 cursor-pointer flex-shrink-0 mb-20  relative group">
                    <img
                      src={
                        poster_path
                          ? `https://image.tmdb.org/t/p/original${poster_path}`
                          : defaultPhoto
                      }
                      alt={postTitle}
                      className=" aspect-[1/1.5] rounded-md"
                      loading="lazy"
                    />
                    <div className="shadow-layer absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition duration-300"></div>
                    {/* Rating  */}
                    <Rating rate={vote_average} type="swipe" />
                    <div className="poster-details text-white ">
                      <h2 className=" text-lg sm:text-xl w-full  break-words  whitespace-break-spaces  text-white mt-4  ">
                        {postTitle}
                      </h2>
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>

        <button
          onClick={swipeRight}
          className=" absolute right-0 top-28  z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </>
  );
}

export default React.memo(SwipeList);
