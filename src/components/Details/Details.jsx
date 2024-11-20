import React from "react";
import PosterImage from "../PosterImage/PosterImage";
import Rating from "./../Rating/Rating";
import { useParams } from "react-router-dom";
import BackdropCover from "../BackdropCover/BackdropCover";
// import { useParams } from "react-router-dom";
// import {
//   useMovieDetails,
//   useMovieCast,
//   useMovieTrailer,
//   useRelatedMovie,
// } from "../Apis/MovieApi";

import {
  useSeriesDetails,
  useSeriesCast,
  useSeriesTrailer,
  useRelatedSeries,
} from "../Apis/SeriesApi";
import CategorySection from "../CategorySection/CategorySection";
function Details() {
  const { id } = useParams();
  const { data: seriesData, isLoading: seriesDataLoading } =
    useSeriesDetails(id);
  const { data: seriesCast, isLoading: seriesCastLoading } = useSeriesCast(id);
  const { data: seriesTrailer, isLoading: seriesTrailerLoading } =
    useSeriesTrailer(id);
  const { data: relatedSeries, isLoading: relatedSeriesLoading } =
    useRelatedSeries(id);
  if (relatedSeriesLoading) {
    <p>Loading</p>;
  } else {
    <p>noooooooooooooo</p>;
  }
  console.log(relatedSeries);

  const firstRelatedSeries = relatedSeries?.[0];
  console.log(firstRelatedSeries?.vote_average, "first");
  // const formatRunTime = (minutes) => {
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   return `${hours}h ${mins}m`;
  // };
  // const {  type , id } = useParams();
  // console.log(type , 'type')
  // console.log(id , 'id')

  // const { data: movieData, isError, isLoading } = useMovieDetails(id);
  // const { data: movieCast } = useMovieCast(id);
  // const { data: movieTrailer } = useMovieTrailer(id);
  // const { data: relatedMovie } = useRelatedMovie(id);
  // const { data: seriesData } = useSeriesDetails(id);
  // const { data: seriesTrailer } = useSeriesTrailer(id);
  // const { data: relatedSeries } = useRelatedSeries(id);
  // const { data: seriesCast } = useSeriesCast(id);

  // const isMovie = type === "movie";

  // const data = isMovie ? movieData : seriesData;
  // const cast = isMovie ? movieCast : seriesCast;
  // const trailer = isMovie ? movieTrailer : seriesTrailer;
  // const related = isMovie ? relatedMovie : relatedSeries;

  const firstTrailer = seriesTrailer?.[0];
  const trailerKey = firstTrailer?.key;

  const roundedAverageRate = parseFloat(seriesData?.vote_average.toFixed(1));

  return (
    <>
      <BackdropCover backgroundCover={`${seriesData?.backdrop_path}`} />

      <div className=" px-16 py-6 md:py-12 flex flex-col gap-10 md:gap-9 text-white">
        <div className="z-50 -mt-[26rem] flex justify-center  gap-10   ">
          <div className=" first-section   ">
            <PosterImage
              poster={`${seriesData?.poster_path}`}
              classes="details"
            />
          </div>
          <div className=" second-section flex flex-col gap-8   max-w-4xl   ">
            <div className=" flex flex-col gap-5 ">
              <div className=" flex flex-col gap-3">
                <div className=" flex items-center gap-3">
                  <Rating rate={roundedAverageRate} type="details" />
                  <h2 className=" text-3xl"> {`${seriesData?.name}`} </h2>
                </div>
                <p> {`${seriesData?.tagline}`} </p>
              </div>
              <div className=" flex flex-wrap gap-2">
                {seriesData?.genres?.map((genre) => {
                  return (
                    <span
                      key={genre?.id}
                      className="h-fit px-4 py-1 text-gray-200 text-sm bg-mainColor rounded-3xl"
                    >
                      {genre.name}
                    </span>
                  );
                })}
              </div>
              <div className="over-view-section flex flex-col gap-3 md:gap-4">
                <div className=" flex flex-col gap-2">
                  <h2 className=" text-3xl text-white">OverView</h2>
                  <p className=" text-lg text-gray-300">
                    {" "}
                    {seriesData?.overview}
                  </p>
                </div>
              </div>
              <div className="movie-info flex flex-col md:flex-row gap-1.5 md:gap-4">
                <div className="status flex gap-2">
                  <p className=" text-white text-lg font-medium">Status:</p>
                  <p className=" text-gray-300 text-lg">
                    {" "}
                    {seriesData?.status}{" "}
                  </p>
                </div>
                <div className="status flex gap-2">
                  <p className=" text-white text-lg font-medium">
                    Release Date:
                  </p>
                  <p className=" text-gray-300 text-lg">
                    {" "}
                    {seriesData?.first_air_date}{" "}
                  </p>
                </div>
                <div className="status flex gap-2">
                  <p className=" text-white text-lg font-medium"> Seasons: </p>
                  <p className=" text-gray-300 text-lg">
                    {" "}
                    {seriesData?.number_of_seasons}{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="cast">
              <div className="flex flex-col gap-3">
                <h2 className=" text-white text-3xl">Cast</h2>
                <div className="cast-info flex flex-wrap gap-3">
                  {seriesCast?.cast?.slice(0, 6).map((actor) => {
                    return (
                      <div className=" flex flex-col gap-2 w-20">
                        <img
                          src={`https://image.tmdb.org/t/p/original/${actor?.profile_path}`}
                          alt={actor?.name || "Actor"}
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
          </div>
        </div>
        {/* trailer */}
        <div className="tailer flex flex-col items-center">
          <div className=" max-w-5xl w-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              className=" aspect-video "
              width="100%"
              title={seriesTrailer?.name}
            >
              {" "}
            </iframe>
          </div>
        </div>
        {/* last section */}
        <CategorySection
          showButton={false}
          category="Similar Series"
          data={relatedSeries} //the api itself
          rate={firstRelatedSeries?.vote_average}
        />
      </div>
    </>
  );
}

export default Details;
