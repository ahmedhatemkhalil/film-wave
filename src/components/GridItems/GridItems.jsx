import React from "react";
import { Link } from "react-router-dom";
import defaultPhoto from "../../assets/image-placeholder.png";
import Rating from "../Rating/Rating";

function GridItems({
  name,
  date,
  posterImage,
  rate,
  type,
  id,
  altText,
}) {
  const roundedRate = rate ? parseFloat(rate?.toFixed(1)) : null;

  return (
    <>
      <Link
        to={`/details/${type}/${id}`}
        aria-label={`view details for ${name}`}
      >
        <div className=" poster  cursor-pointer mt-6  relative group">
          <div className=" relative ">
            <img
              className="aspect-[1/1.5] rounded-md  "
              src={posterImage || defaultPhoto}
              alt={altText}
            />
            <div className="shadow-layer absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition duration-300"></div>

            <div className="flex items-center gap-3">
              <Rating rate={roundedRate} type="swipe" />
            </div>
          </div>
          <div className="poster-details flex flex-col  mt-4 ">
            <h2 className=" text-white "> {name} </h2>
            <p className=" text-gray-500 mt-1  "> {date} </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default GridItems;
