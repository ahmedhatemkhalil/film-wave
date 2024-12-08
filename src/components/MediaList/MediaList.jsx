import React from "react";
import HeroBanner from "../HeroBanner/HeroBanner";
import { NavLink, useLocation, useParams } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import GridItems from "../GridItems/GridItems";
import Loading from "../Loading/Loading";
import defaultPhoto from "../../assets/image-placeholder.png";

function MediaList({ kind, mediaLists, useMediaList, title }) {
  const { type } = useParams();
  const location = useLocation();
  const endpoint = type === "trending" ? "trending" : kind;
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useMediaList(
    endpoint,
    endpoint === "trending" ? "day" : type || "popular"
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [items, setItems] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const observerRef = React.useRef();

  const defaultItems = data?.pages.flatMap((page) => page.results) || [];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !isPaused
        ) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isPaused]);

  const handleSearch = (results) => {
    setItems(results || []);
    setIsSearching(results === null);
    setIsPaused(results !== null);
  };
  if (isLoading && !isFetchingNextPage) {
    return <Loading />;
  }
  if (error) {
    return <div>Error fetching details: {error.message}</div>;
  }

  return (
    <>
      <HeroBanner kind={kind} />
      <div className="relative px-0 sm:px-16 z-50 -mt-[50vh] pb-6 md:py-12 flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col gap-3 md:gap-6 px-4 sm:px-0 ">
          <h2 className=" text-3xl md:text-4xl text-white font-medium">
            {title}
          </h2>
          <ul
            role="menu"
            className=" flex flex-wrap gap-y-2 gap-x-6 text-xl text-white"
          >
            {mediaLists.map(({ path, text, id }) => (
              <li
                role="menuitem"
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

          <SearchBar
            searchType={kind}
            setResults={handleSearch}
            isLoading={isLoading}
          />

          {isLoading && !isSearching && !isFetchingNextPage ? (
            <Loading />
          ) : (
            <>
              {isSearching && items.length === 0 ? (
                <p className="text-white text-xl">
                  Couldn't find anything related to your search query.
                </p>
              ) : (
                <div className="movie grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-10">
                  {(items?.length > 0 ? items : defaultItems).map(
                    (
                      {
                        id,
                        vote_average,
                        poster_path,
                        name,
                        first_air_date,
                        title,
                        release_date,
                      },
                      index
                    ) => (
                      <GridItems
                        type={kind}
                        id={id}
                        rate={vote_average}
                        key={`${id}-${index}`}
                        posterImage={
                          poster_path
                            ? `https://image.tmdb.org/t/p/original${poster_path}`
                            : defaultPhoto
                        }
                        name={title || name}
                        date={release_date || first_air_date}
                        isLoading={isLoading}
                      />
                    )
                  )}
                </div>
              )}
            </>
          )}

          <div ref={observerRef} style={{ height: "20px" }}></div>
        </div>
      </div>
    </>
  );
}

export default MediaList;
