import React from "react";
import CategorySection from "../CategorySection/CategorySection";
import { useTrendingMovies, useUpComingMovies } from "../Apis/MovieApi";

import { useTVSeriesAiringToday, useTrendingSeries } from "../Apis/SeriesApi";

import HomeSlider from "./HomeSlider";
import Loading from "../Loading/Loading";

function Home() {
  const {
    data: trendingMovies,
    isLoading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useTrendingMovies();
  const {
    data: trendingSeries,
    isLoading: trendingSeriesLoading,
    error: trendingSeriesError,
  } = useTrendingSeries();
  const {
    data: upComingMovies,
    isLoading: upComingMoviesLoading,
    error: upComingMoviesError,
  } = useUpComingMovies();
  const {
    data: tvSeriesAiringToday,
    isLoading: tvSeriesAiringTodayLoading,
    error: tvSeriesAiringTodayError,
  } = useTVSeriesAiringToday();

  const loadingFlag = [
    trendingMoviesLoading,
    trendingSeriesLoading,
    upComingMoviesLoading,
    tvSeriesAiringTodayLoading,
  ];
  const errorFlag = [
    trendingMoviesError,
    trendingSeriesError,
    upComingMoviesError,
    tvSeriesAiringTodayError,
  ];

  const isLoading = loadingFlag.includes(true);
  const isError = errorFlag.includes(true);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error fetching details: {isError.message}</div>;
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
            type="home"
            isLoading= {isLoading}
          />
          <CategorySection
            data={trendingSeries}
            category="Trending TV Series"
            mediaType="series"
            type="home"
            isLoading= {isLoading}

          />
          <CategorySection
            data={upComingMovies}
            category="Upcoming Movies"
            mediaType="movie"
            type="home"
            isLoading= {isLoading}

          />
          <CategorySection
            data={tvSeriesAiringToday}
            category="TV Series Airing Today"
            mediaType="tv"
            type="home"
            isLoading= {isLoading}

          />
        </div>
      </section>
    </>
  );
}

export default Home;
