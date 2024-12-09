import React from "react";
import PosterImage from "../PosterImage/PosterImage";
import Rating from "./../Rating/Rating";
import { useLocation, useParams } from "react-router-dom";
import BackdropCover from "../BackdropCover/BackdropCover";
import defaultPhoto from "../../assets/image-placeholder.png";

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
import PosterImageSkeleton from "../Skeleton/PosterImageSkeleton";
import GenresSkeleton from "../Skeleton/GenresSkeleton";
import OverViewSkeleton from "../Skeleton/OverViewSkeleton";
import DetailsInfoSkeleton from "../Skeleton/DetailsInfoSkeleton";
import CastSkeleton from "../Skeleton/CastSkeleton";
import TrailerSkeleton from "../Skeleton/TrailerSkeleton";
import RatingSkeleton from "../Skeleton/RatingSkeleton";
import BackdropCoverSkeleton from "../Skeleton/BackdropCoverSkeleton";
import RelatedSkeleton from "../Skeleton/RelatedSkeleton";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

function Details() {
  const [isSkeletonVisible, setIsSkeletonVisible] = React.useState(true);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSkeletonVisible(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  const isDetailsLoading = detailsLoading;
  const isTrailerLoading = trailerLoading;
  const isCastLoading = castLoading;
  const isRelatedLoading = relatedLoading;

  const isError = detailsError || trailerError || castError || relatedError;

  const title = React.useMemo(
    () =>
      type === "tv"
        ? detailsData?.name || "Unknown TV Show"
        : detailsData?.title || "Unknown Movie",
    [type, detailsData]
  );
  React.useEffect(() => {
    document.title = title;

    return () => {
      document.title = "Film Wave";
    };
  }, [title]);

  const trailerKey = React.useMemo(
    () => trailerData?.results?.find((video) => video?.type === "Trailer")?.key,
    [trailerData]
  );

  const processedRelatedData = React.useMemo(
    () =>
      relatedData?.results?.map((poster) => ({
        ...poster,
        media_type: poster.media_type || type,
      })),
    [relatedData, type]
  );

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">
          Oops! Something went wrong. Please try again later.
        </p>
      </div>
    );
  }
  const poster = detailsData?.poster_path
    ? `${IMAGE_BASE_URL}${detailsData.poster_path}`
    : null;
  const backdrop = detailsData?.backdrop_path
    ? `${IMAGE_BASE_URL}${detailsData.backdrop_path}`
    : null;

  return (
    <>
      {/* Backdrop */}
      {isSkeletonVisible || isDetailsLoading ? (
        <BackdropCoverSkeleton />
      ) : (
        <BackdropCover backgroundCover={backdrop} poster={poster} />
      )}

      <div className=" px-6 sm:px-12  special-size:px-12 lg:px-16 py-6 md:py-12 flex flex-col gap-10 md:gap-9 text-white">
        {/* Main Details Section */}
        <div className="z-50 -mt-[26rem] flex justify-center max-975:gap-10">
          <div className="first-section">
            {isSkeletonVisible || isDetailsLoading ? (
              <PosterImageSkeleton />
            ) : (
              <PosterImage poster={poster || defaultPhoto} classes="details" />
            )}
          </div>
          <div className="second-section flex flex-col gap-12 md:gap-8 max-w-4xl">
            <div className="flex flex-col gap-5">
              {/* Title and Rating */}
              <div className="flex items-center gap-3">
                {isSkeletonVisible || isDetailsLoading ? (
                  <RatingSkeleton />
                ) : (
                  <>
                    {" "}
                    <Rating rate={detailsData?.vote_average} type="details" />
                    <h2 className="text-3xl">{title}</h2>{" "}
                  </>
                )}
              </div>
              {/* Genres */}
              {isSkeletonVisible || isDetailsLoading ? (
                <GenresSkeleton />
              ) : (
                <Genres genres={detailsData?.genres} />
              )}
              {/* Overview */}
              {isSkeletonVisible || isDetailsLoading ? (
                <OverViewSkeleton />
              ) : (
                <OverView overview={detailsData?.overview} />
              )}
              {/* Movie Info */}
              {isSkeletonVisible || isDetailsLoading ? (
                <DetailsInfoSkeleton />
              ) : (
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
                />
              )}
            </div>
            {/* Cast Section */}
            {isSkeletonVisible || isCastLoading ? (
              <CastSkeleton />
            ) : (
              <CastTeam cast={castData?.cast} />
            )}
          </div>
        </div>

        {/* Trailer Section */}
        {isSkeletonVisible || isTrailerLoading ? (
          <TrailerSkeleton />
        ) : (
          <Trailer
            trailerKey={trailerKey}
            title={type === "tv" ? detailsData?.name : detailsData?.title}
          />
        )}

        {/* Related Section */}
        <div className="related-section">
          {isRelatedLoading ? (
            <RelatedSkeleton />
          ) : processedRelatedData?.length > 0 ? (
            <CategorySection
              type="details"
              showButton={false}
              category={type === "tv" ? "Similar TV Shows" : "Similar Movies"}
              data={processedRelatedData}
              rate={relatedData?.results?.vote_average}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Details;
