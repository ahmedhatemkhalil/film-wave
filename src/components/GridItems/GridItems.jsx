import React from "react";
import { Link } from "react-router-dom";

function GridItems({ name, date, posterImage, rate, type, id }) {
  const roundedRate = parseFloat(rate?.toFixed(1));
  const detailsPath =
    type === "series" ? `/series-details/${id}` : `/movie-details/${id}`;

  return (
    <>
      <Link to={`/series-details/${id}`}>
        <div className=" poster  cursor-pointer  mb-14  relative group">
          <div className=" relative mt-3">
            <img
              className="aspect-[1/1.5] rounded-md"
              src={posterImage}
              alt=""
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
