import React from "react";

function Genres({ genres }) {
  if (!genres || genres.length === 0) {
    return <p className="text-gray-300">No genres available.</p>;
  }
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {genres?.map(({ id, name }) => (
          <span
            key={id}
            className="h-fit px-4 py-1 text-gray-200 text-sm bg-mainColor rounded-3xl"
            aria-label={`Genre: ${name}`}
          >
            {name}
          </span>
        ))}
      </div>
    </>
  );
}

export default Genres;
