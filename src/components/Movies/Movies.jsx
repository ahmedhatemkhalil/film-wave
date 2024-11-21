import React from "react";
import HeroBanner from "../HeroBanner/HeroBanner";
import { movieLists } from "../../data/series and movies lists";
import { Link, NavLink, useParams } from "react-router-dom";
import GridItems from "../GridItems/GridItems";
import SearchBar from "../SearchBar/SearchBar";
import InfiniteScroll from "./../../../node_modules/react-infinite-scroll-component/dist/index.es";
import { useMovieList } from "../Apis/MovieApi.js";

function Movies() {
  const { type = "popular" } = useParams();
  const endpoint = type === "trending" ? "trending" : "movie";
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useMovieList(endpoint, endpoint === "trending" ? "day" : type);

  const movies = data?.pages.flatMap((page) => page.results);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError) return <div className="text-white">Error: {error.message}</div>;
  return (
    <>
      <HeroBanner bgImage="movies" />
      <div className="relative px-0 sm:px-16 z-50 -mt-[50vh] pb-6 md:py-12 flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col gap-3 md:gap-6 px-4 sm:px-0 ">
          <h2 className=" text-3xl md:text-4xl text-white font-medium">
            Movies
          </h2>
          <ul className=" flex flex-wrap gap-y-2 gap-x-6 text-xl text-white">
            {movieLists.map(({ path, text, id }) => (
              <li className=" hover:text-mainColor duration-300 transition-all" key={id}>
                <NavLink className={({isActive})=>  isActive ? 'text-mainColor' : ''  } to={path}> {text} </NavLink>
              </li>
            ))}
          </ul>

          <SearchBar />
          <InfiniteScroll
            dataLength={movies.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading...</h4>}
          >
            <div className="   movie grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-10">
              {movies.map((movie) => (
                <GridItems
                  type="movie"
                  id={movie?.id}
                  movie={movie}
                  rate={movie?.vote_average}
                  key={movie?.id}
                  posterImage={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                  name={movie?.title}
                  date={movie?.release_date}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}

export default Movies;
