import React from "react";
import Loading from "../Loading/Loading";
function Trailer({ trailerKey, title, loadingTrailer }) {
  if (loadingTrailer) {
    <Loading />;
  }
  return (
    <>
      {trailerKey && (
        <div className="trailer flex flex-col items-center">
          <div className="max-w-5xl w-full">
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
