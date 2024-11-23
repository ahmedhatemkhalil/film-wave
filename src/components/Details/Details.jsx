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

function Details() {
  const { id, type } = useParams();
  const { data: detailsData, isLoading: detailsLoading } = useDetails(type, id);
  const { data: trailerData, isLoading: trailerLoading } = useTrailer(type, id);
  const { data: castData, isLoading: castLoading } = useCast(type, id);
  const { data: relatedData, isLoading: relatedLoading } = useRelated(type, id);

  // Handling loading state
  if (detailsLoading || trailerLoading || castLoading || relatedLoading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  // Extract trailer key for embedding YouTube
   const trailerKey = trailerData?.results?.find(
    (video) => video?.type === "Trailer"
  )?.key;

  const title = type === "tv" ? detailsData?.name : detailsData?.title;

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

      <div className="px-16 py-6 md:py-12 flex flex-col gap-10 md:gap-9 text-white">
        {/* Main Details Section */}
        <div className="z-50 -mt-[26rem] flex justify-center gap-10">
          <div className="first-section">
            <PosterImage poster={poster} classes="details" />
          </div>
          <div className="second-section flex flex-col gap-8 max-w-4xl">
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
                runtime={detailsData?.runtime}
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

        <CategorySection
          showButton={false}
          category={type === "tv" ? "similar series" : "similar movies"}
          data={processedRelatedData}
          rate={(relatedData?.results?.[0]?.vote_average || 0).toFixed(1)}
        />
      </div>
    </>
  );
}

export default Details;
