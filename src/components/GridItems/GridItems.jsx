import React from "react";

function GridItems({ name, date, posterImage }) {
  return (
    <>
      <div className="   movie grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
        {[...Array(48)].map((_, index) => (
          <div
            key={index}
            className=" poster  cursor-pointer  mb-14  relative group"
          >
            <div className=" relative mt-3">
              <img
                className="aspect-[1/1.5] rounded-md"
                src={posterImage}
                alt=""
              />
              <div className="shadow-layer absolute inset-0 bg-black opacity-35 group-hover:opacity-60 transition duration-300"></div>

              <div className="rating-circle absolute bottom-6 left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className=" text-white text-sm font-semibold">7.3</span>
              </div>
            </div>
            <div className="poster-details flex flex-col  mt-4 ">
              <h2 className=" text-white "> {name} </h2>
              <p className=" text-gray-500 mt-1  "> {date} </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GridItems;
