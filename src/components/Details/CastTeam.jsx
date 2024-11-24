import React from "react";

function CastTeam({ cast }) {
  return (
    <>
      <div className="cast">
        <h2 className="text-white text-3xl">Cast</h2>
        <div className="cast-info flex flex-wrap gap-3">
          {cast?.slice(0, 6)?.map((actor) => (
            <div key={actor?.id} className="flex flex-col gap-2 w-20">
              <img
                src={`https://image.tmdb.org/t/p/original/${actor?.profile_path}`}
                alt={actor?.name || "Actor"}
                className="w-full h-32 bg-contain bg-no-repeat "
              />
              <p className="text-sm text-gray-300 break-words hyphens-auto">
                {actor?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CastTeam;
