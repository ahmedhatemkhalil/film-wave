import React from "react";

function Genres({ genres }) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {genres?.map((genre) => (
          <span
            key={genre?.id}
            className="h-fit px-4 py-1 text-gray-200 text-sm bg-mainColor rounded-3xl"
          >
            {genre?.name}
          </span>
        ))}
      </div>
      
    </>
  );
}

export default Genres;
