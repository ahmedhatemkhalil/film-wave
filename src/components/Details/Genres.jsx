import React from "react";

function Genres({ genres }) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {genres?.map(({id , name}) => (
          <span
            key={id}
            className="h-fit px-4 py-1 text-gray-200 text-sm bg-mainColor rounded-3xl"
          >
            {name}
          </span>
        ))}
      </div>
      
    </>
  );
}

export default Genres;
