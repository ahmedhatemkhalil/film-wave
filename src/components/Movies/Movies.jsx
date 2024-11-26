import React from "react";
import HeroBanner from "../HeroBanner/HeroBanner";
import { movieLists } from "../../data/series and movies lists";
import { NavLink, useParams } from "react-router-dom";
import GridItems from "../GridItems/GridItems";
import SearchBar from "../SearchBar/SearchBar";
import InfiniteScroll from "./../../../node_modules/react-infinite-scroll-component/dist/index.es";
import { useMovieList } from "../Apis/MovieApi.js";
import Loading from "../Loading/Loading.jsx";

function Movies() {
  const [movies, setMovies] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const { type = "popular" } = useParams();
  const endpoint = type === "trending" ? "trending" : "movie";
  const { data, isLoading, fetchNextPage, hasNextPage, error } = useMovieList(
    endpoint,
    endpoint === "trending" ? "day" : type
  );

  const defaultMovies = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error fetching details: {error.message}</div>;
  }

  const handleSearch = (results) => {
    setMovies(results || []);
    setIsSearching(results === null);
  };

  return (
    <>
      <HeroBanner kind="movie" />
      <div className="relative px-0 sm:px-16 z-50 -mt-[50vh] pb-6 md:py-12 flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col gap-3 md:gap-6 px-4 sm:px-0 ">
          <h2 className=" text-3xl md:text-4xl text-white font-medium">
            Movies
          </h2>
          <ul
            role="menu"
            className=" flex flex-wrap gap-y-2 gap-x-6 text-xl text-white"
          >
            {movieLists.map(({ path, text, id }) => (
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

          <SearchBar searchType="movie" setResults={handleSearch} />
          <InfiniteScroll
            dataLength={movies.length || defaultMovies.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Loading />}
          >
            {isSearching ? (
              <p className="text-white text-xl">
                Couldn't find anything related to your search query.
              </p>
            ) : (
              <div className="   movie grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-10">
                {(movies?.length > 0 ? movies : defaultMovies).map(
                  ({ id, vote_average, poster_path, title, release_date }) => (
                    <GridItems
                      type="movie"
                      id={id}
                      rate={vote_average}
                      key={id}
                      posterImage={`https://image.tmdb.org/t/p/w500${poster_path}`}
                      name={title}
                      date={release_date}
                    />
                  )
                )}
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}

export default Movies;
