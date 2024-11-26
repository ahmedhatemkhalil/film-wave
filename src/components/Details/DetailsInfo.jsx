import React from "react";

function DetailsInfo({ status, releaseDate, runtime }) {
  const formatRunTime = (value) => {
    if (typeof value === "number") {
      const hours = Math.floor(value / 60);
      const mins = value % 60;
      return `${hours}h ${mins}m`;
    }
    return value;
  };
  return (
    <>
      <div className="movie-info flex flex-col md:flex-row gap-1.5 md:gap-4">
        <div className="status flex gap-2">
          <p className="text-white text-lg font-medium">Status:</p>
          <p className="text-gray-300 text-lg">{status}</p>
        </div>
        <div className="status flex gap-2">
          <p className="text-white text-lg font-medium">Release Date:</p>
          <p className="text-gray-300 text-lg">{releaseDate}</p>
        </div>
        <div className="status flex gap-2">
          <p className="text-white text-lg font-medium">
            {typeof runtime === "number" ? "Runtime:" : "seasons:"}
          </p>
          <p className="text-gray-300 text-lg">{formatRunTime(runtime)} </p>
        </div>
      </div>
    </>
  );
}

export default DetailsInfo;
