import React from "react";
import HeroBanner from "./../HeroBanner/HeroBanner";
import SearchBar from "../SearchBar/SearchBar";
import GridItems from "../GridItems/GridItems";
import { seriesLists } from "../../data/series and movies lists";
import { Link, NavLink } from "react-router-dom";
import InfiniteScroll from "./../../../node_modules/react-infinite-scroll-component/dist/index.es";
import { useParams } from "react-router-dom";
import { useSeriesList } from "../Apis/SeriesApi";

function Series() {
  const { type = "popular" } = useParams();
  const endpoint = type === "trending" ? "trending" : "tv";
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useSeriesList(endpoint, endpoint === "trending" ? "day" : type);

  const series = data?.pages.flatMap((show) => show.results);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <>
      <HeroBanner kind= 'series'  />
      <div className="relative px-0 sm:px-16 z-50 -mt-[50vh] pb-6 md:py-12 flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col gap-3 md:gap-6 px-4 sm:px-0 ">
          <h2 className=" text-3xl md:text-4xl text-white font-medium">
            Series
          </h2>
          <ul className=" flex flex-wrap gap-y-2 gap-x-6 text-xl text-white">
            {seriesLists.map(({ path, text, id }) => (
              <li className=" hover:text-mainColor duration-300 transition-all" key={id}>
              <NavLink className={({isActive})=>  isActive ? 'text-mainColor' : ''  } to={path}> {text} </NavLink>
            </li>
            ))}
          </ul>

          <SearchBar />
          <InfiniteScroll
            dataLength={series.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading...</h4>}
          >
            <div className="   movie grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-10">
              {series?.map((show) => (
                <GridItems
                  type="tv"
                  id={show?.id}
                  series={show}
                  rate={show?.vote_average}
                  key={show?.id}
                  posterImage={`https://image.tmdb.org/t/p/w500${show?.poster_path}`}
                  name={show?.name}
                  date={show?.first_air_date}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}

export default Series;
