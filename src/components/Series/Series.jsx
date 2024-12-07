import React from "react";
import HeroBanner from "./../HeroBanner/HeroBanner";
import SearchBar from "../SearchBar/SearchBar";
import GridItems from "../GridItems/GridItems";
import { seriesLists } from "../../data/series and movies lists";
import { NavLink, useLocation} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSeriesList } from "../Apis/SeriesApi";
import defaultPhoto from "../../assets/image-placeholder.png";
import Loading from "../Loading/Loading";

function Series() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [series, setSeries] = React.useState([]);
  const observerRef = React.useRef();
  const { type } = useParams();

  const endpoint = type === "trending" ? "trending" : "tv";
  const {
    data,
    fetchNextPage,
    hasNextPage,
    error,
    isLoading,
    isFetchingNextPage,
  } = useSeriesList(
    endpoint,
    endpoint === "trending" ? "day" : type || "popular"
  );


  const defaultSeries = data?.pages.flatMap((page) => page.results) || [];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && !isPaused) {
          fetchNextPage();
        }
      },
      { threshold: 0.8, root: null }
    );
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, isPaused]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const handleSearch = (results) => {
    setSeries(results || []);
    setIsSearching(results === null);
    setIsPaused(results !== null);
  };
  if (isLoading && !isFetchingNextPage) {
    return <Loading />;
  }

  return (
    <>
    
      <HeroBanner kind="series" />
      <div className="relative px-0 sm:px-16 z-50 -mt-[50vh] pb-6 md:py-12 flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col gap-3 md:gap-6 px-4 530:p-8 sm:px-0 ">
          <h2 className=" text-3xl md:text-4xl text-white font-medium">
            Series
          </h2>
          <ul className=" flex flex-wrap gap-y-2 gap-x-6 text-xl text-white">
            {seriesLists.map(({ path, text, id }) => (
              <li
                className=" hover:text-mainColor duration-300 transition-all"
                key={id}
              >
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-mainColor" : ""
                  }
                  to={path}
                >
                  {" "}
                  {text}{" "}
                </NavLink>
              </li>
            ))}
          </ul>

          <SearchBar searchType="tv" setResults={handleSearch} />

          {isSearching && series.length === 0 ? (
            <p className=" text-white text-xl">
              Couldn't find anything related to your search query.
            </p>
          ) : (
            <div className="   movie grid grid-cols-2 530:grid-cols-3  gap-x-10 530:gap-x-6 md:gap-x-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-y-2 sm:gap-y-10 ">
              {(series?.length > 0 ? series : defaultSeries).map(
                (
                  { id, vote_average, poster_path, name, first_air_date },
                  index
                ) => (
                  <GridItems
                    type="tv"
                    id={id}
                    rate={vote_average}
                    key={`${id}-${index}`}
                    posterImage={
                      poster_path
                        ? `https://image.tmdb.org/t/p/original${poster_path}`
                        : defaultPhoto
                    }
                    name={name}
                    date={first_air_date}
                    altText={name || `Image for ${name || "series"}`}
                    isLoading={isLoading}
                  />
                )
              )}
            </div>
          )}
          <div ref={observerRef} style={{ height: "20px" }}></div>
        </div>
        {isFetchingNextPage && <Loading />}
      </div>
    </>
  );
}

export default Series;
