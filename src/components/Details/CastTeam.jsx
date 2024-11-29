import React from "react";
import actor from "../../assets/a-person-icon-on-a-transparent-background-png.png";
function CastTeam({ cast }) {
  return (
    <>
      <div className="cast gap-3 md:gap-4 flex flex-col">
        <h2 className="text-white text-3xl">Cast</h2>
        <div className="cast-info justify-center 428:justify-start flex flex-wrap gap-5">
          {cast?.slice(0, 6)?.map(({ id, name, profile_path }) => (
            <div key={id} className="flex flex-col gap-2 w-20">
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/original/${profile_path}`
                    : actor
                }
                alt={
                  name ? `${name}'s profile picture` : "Actor's profile picture"
                }
                className="w-full h-32 bg-contain  "
              />
              <p className="text-sm   text-gray-300 break-words ">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CastTeam;
