import React from "react";
import PosterImage from "../PosterImage/PosterImage";
import Rating from "./../Rating/Rating";
import { useParams } from "react-router-dom";
import BackdropCover from "../BackdropCover/BackdropCover";
import {
  useDetails,
  useTrailer,
  useCast,
  useRelated,
} from "../Apis/ApiFetching";
import CategorySection from "../CategorySection/CategorySection";
import Genres from "./Genres";
import DetailsInfo from "./DetailsInfo";
import OverView from "./OverView";
import CastTeam from "./CastTeam";
import Trailer from "./Trailer";
import Loading from "../Loading/Loading";

function Details() {
  const { id, type } = useParams();
  const {
    data: detailsData,
    isLoading: detailsLoading,
    error: detailsError,
  } = useDetails(type, id);
  const {
    data: trailerData,
    isLoading: trailerLoading,
    error: trailerError,
  } = useTrailer(type, id);
  const {
    data: castData,
    isLoading: castLoading,
    error: castError,
  } = useCast(type, id);
  const {
    data: relatedData,
    isLoading: relatedLoading,
    error: relatedError,
  } = useRelated(type, id);

  const loadingFlag = [
    detailsLoading,
    trailerLoading,
    castLoading,
    relatedLoading,
  ];
  const errorFlag = [detailsError, trailerError, castError, relatedError];

  const isLoading = loadingFlag.includes(true);
  const isError = errorFlag.includes(true);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }
  if (isError) {
    return <div>Error fetching details: {isError.message}</div>;
  }
  // Extract trailer key for embedding YouTube
  const trailerKey = trailerData?.results?.find(
    (video) => video?.type === "Trailer"
  )?.key;

  const title = type === "tv" ? detailsData?.name || "Unknown TV Show"  : detailsData?.title || "Unknown Movie";

  const poster = `https://image.tmdb.org/t/p/original/${detailsData?.poster_path}`;
  const backdrop = detailsData?.backdrop_path;

  const processedRelatedData = relatedData?.results?.map((poster) => ({
    ...poster,
    media_type: poster.media_type || type,
  }));
  return (
    <>
      {/* Backdrop */}
      <BackdropCover backgroundCover={backdrop} />

      <div className=" px-6 sm:px-12  special-size:px-12 lg:px-16 py-6 md:py-12 flex flex-col gap-10 md:gap-9 text-white">
        {/* Main Details Section */}
        <div className="z-50 -mt-[26rem] flex justify-center max-975:gap-10">
          <div className="first-section">
            <PosterImage poster={poster} classes="details" />
          </div>
          <div className="second-section flex flex-col gap-12 md:gap-8 max-w-4xl">
            <div className="flex flex-col gap-5">
              {/* Title and Rating */}
              <div className="flex items-center gap-3">
                <Rating
                  rate={parseFloat(detailsData?.vote_average?.toFixed(1))}
                  type="details"
                />
                <h2 className="text-3xl">{title}</h2>
              </div>
              {/* Genres */}
              <Genres genres={detailsData?.genres} />
              {/* Overview */}
              <OverView overview={detailsData?.overview} />
              {/* Movie Info */}
              <DetailsInfo
                status={detailsData?.status}
                releaseDate={
                  type === "tv"
                    ? detailsData?.first_air_date
                    : detailsData?.release_date
                }
                runtime={
                  type === "tv"
                    ? `${detailsData?.number_of_seasons}`
                    : detailsData?.runtime
                }
                DetailsInfo
              />{" "}
            </div>
            {/* Cast Section */}
            <CastTeam cast={castData?.cast} />
          </div>
        </div>

        {/* Trailer Section */}
        <Trailer
          trailerKey={trailerKey}
          title={type === "tv" ? detailsData?.name : detailsData?.title}
        />
        {/* Related Section */}
       {processedRelatedData?.length > 0 && (
        <CategorySection
          type="details"
          showButton={false}
          category={type === "tv" ? "similar Tv Shows" : "similar movies"}
          data={processedRelatedData}
          rate={(relatedData?.results?.[0]?.vote_average || 0).toFixed(1)}
        />
       )}
      </div>
    </>
  );
}

export default Details;
