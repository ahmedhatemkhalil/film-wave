import React from "react";
import CategorySection from "../CategorySection/CategorySection";
import { useTrendingMovies, useUpComingMovies } from "../Apis/MovieApi";

import { useTVSeriesAiringToday, useTrendingSeries } from "../Apis/SeriesApi";

import HomeSlider from "./HomeSlider";
import Loading from "../Loading/Loading";

function Home() {
  const { data: trendingMovies, isLoading: trendingMoviesLoading } =
    useTrendingMovies();
  const { data: trendingSeries, isLoading: trendingSeriesLoading } =
    useTrendingSeries();
  const { data: upComingMovies, isLoading: upComingMoviesLoading } =
    useUpComingMovies();
  const { data: tvSeriesAiringToday, isLoading: tvSeriesAiringTodayLoading } =
    useTVSeriesAiringToday();

  const isLoading =
    trendingMoviesLoading ||
    trendingSeriesLoading ||
    upComingMoviesLoading ||
    tvSeriesAiringTodayLoading;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <HomeSlider />

      {/* second section in Home  */}
      <section>
        <div className="py-8 px-6 sm:px-12 md:px-16">
          <CategorySection
            data={trendingMovies}
            category="Trending Movies"
            mediaType="movie"
          />
          <CategorySection
            data={trendingSeries}
            category="Trending TV Series"
            mediaType="series"
          />
          <CategorySection
            data={upComingMovies}
            category="Upcoming Movies"
            mediaType="movie"
          />
          <CategorySection
            data={tvSeriesAiringToday}
            category="TV Series Airing Today"
            mediaType="tv"
          />
        </div>
      </section>
    </>
  );
}

export default Home;
