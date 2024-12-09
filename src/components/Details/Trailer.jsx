import React from "react";
function Trailer({ trailerKey, title, showTitle = true }) {
  return (
    <>
      {trailerKey && (
        <div className="trailer flex flex-col items-center">
          <div className="max-w-full  md:max-w-5xl w-full">
            {showTitle && (
              <h2 className=" text-3xl mb-6 font-semibold">Trailer</h2>
            )}

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              className="aspect-video"
              width="100%"
              title={title}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default Trailer;
