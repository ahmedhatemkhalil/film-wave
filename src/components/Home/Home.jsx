import React from "react";
import CategorySection from "../CategorySection/CategorySection";
import { useTrendingMovies, useUpComingMovies } from "../Apis/MovieApi";
import { useTVSeriesAiringToday, useTrendingSeries } from "../Apis/SeriesApi";
import HomeSlider from "./HomeSlider";
import Loading from "../Loading/Loading";
import { useLocation } from "react-router-dom";

function Home() {
  // the page scrolls to the top whenever the user navigates to a new  page.
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  // If any of the isLoading states are true, isGlobalLoading will be true , indicating that the page is still loading.
  const isGlobalLoading =
    trendingMoviesLoading ||
    trendingSeriesLoading ||
    upComingMoviesLoading ||
    tvSeriesAiringTodayLoading;

  const isError =
    trendingMoviesError ||
    trendingSeriesError ||
    upComingMoviesError ||
    tvSeriesAiringTodayError;

  if (isGlobalLoading) {
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
            isLoading={trendingMoviesLoading}
          />
          <CategorySection
            data={trendingSeries}
            category="Trending TV Series"
            mediaType="series"
            type="home"
            isLoading={trendingSeriesLoading}
          />
          <CategorySection
            data={upComingMovies}
            category="Upcoming Movies"
            mediaType="movie"
            type="home"
            isLoading={upComingMoviesLoading}
          />
          <CategorySection
            data={tvSeriesAiringToday}
            category="TV Series Airing Today"
            mediaType="tv"
            type="home"
            isLoading={tvSeriesAiringTodayLoading}
          />
        </div>
      </section>
    </>
  );
}

export default Home;
