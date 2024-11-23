// import React from "react";
// import { useParams } from "react-router-dom";
// import Trailer from "../Details/Trailer";
// import { useTrailer } from "../Apis/ApiFetching";
// function TrailerPage() {
//   const { type, id } = useParams();
//   const { data: trailerData } = useTrailer(type, id);
//   console.log(trailerData, "trailer data");

//   const trailerKey = trailerData?.results.find(
//     (video) => video?.type === "Trailer"
//   )?.key;
//   return (
//     <>
//       <div className="trailerPage">
//         <Trailer
//           trailerKey={trailerKey}
//           title={type === "movie" ? "Movie Trailer" : "Series Trailer"}
//         />
//       </div>
//     </>
//   );
// }

// export default TrailerPage;
