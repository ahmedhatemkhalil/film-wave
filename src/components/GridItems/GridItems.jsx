import React from "react";
import { Link } from "react-router-dom";
import defaultPhoto from "../../assets/image-placeholder.png";
function GridItems({ name, date, posterImage, rate, type, id, altText }) {
  const roundedRate = rate ? parseFloat(rate?.toFixed(1)) : null;

  return (
    <>
      <Link to={`/details/${type}/${id}`}>
        <div className=" poster  cursor-pointer mt-6   relative group">
          <div className=" relative ">
            <img
              className="aspect-[1/1.5] rounded-md"
              src={posterImage || defaultPhoto}
              alt={altText}
            />
            <div className="shadow-layer absolute inset-0 bg-black opacity-35 group-hover:opacity-60 transition duration-300"></div>

            <div className="rating-circle absolute bottom-6 left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <span className=" text-white text-sm font-semibold">
                {" "}
                {roundedRate}{" "}
              </span>
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
