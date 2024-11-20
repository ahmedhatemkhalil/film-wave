import React from "react";

function Cast({data , cast}) {
  return (
    <>
      <div className="cast">
        <div className="flex flex-col gap-3">
          <h2 className=" text-white text-3xl">Cast</h2>
          <div className="cast-info flex flex-wrap gap-3">
            {cast?.data?.cast?.slice(0, 6).map((actor) => {
              return (
                <div key={actor?.id} className=" flex flex-col gap-2 w-20">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                    alt=""
                    className=" w-full h-32 bg-contain bg-no-repeat"
                  />
                  <p className="text-sm text-gray-300 break-words hyphens-auto">
                    {actor?.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cast;
