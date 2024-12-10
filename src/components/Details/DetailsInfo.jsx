import React from "react";

function DetailsInfo({ status, releaseDate, runtime }) {
  //helper function to extract the run time
  const formatRunTime = (value) => {
    if (typeof value === "number") {
      const hours = Math.floor(value / 60);
      const mins = value % 60;
      return `${hours}h ${mins}m`;
    }
    return value;
  };

  const details = [
    { label: "Status:", value: status || "Unknown" },
    { label: "Release Date:", value: releaseDate || "Unknown" },
    {
      //this condition to specify if a number it a movie otherwise it a series
      label: typeof runtime === "number" ? "Runtime:" : "seasons:",
      value: formatRunTime(runtime),
    },
  ];
  return (
    <>
      <div className="movie-info flex flex-col md:flex-row gap-1.5 md:gap-4">
        {details.map(({ label, value }, index) => (
          <div key={`movie-${index}`} className="status flex gap-2">
            <p className="text-white text-lg font-medium"> {label} </p>
            <p className="text-gray-300 text-lg">{value}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default DetailsInfo;
