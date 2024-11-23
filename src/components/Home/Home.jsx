import React from "react";
import CategorySection from "../CategorySection/CategorySection";
import { useTrendingMovies, useUpComingMovies } from "../Apis/MovieApi";

import { useTVSeriesAiringToday, useTrendingSeries } from "../Apis/SeriesApi";

import HomeSlider from "./HomeSlider";

function Home() {
  const { data: trendingMovies} = useTrendingMovies();
  const { data: trendingSeries } = useTrendingSeries();
  const { data: upComingMovies } = useUpComingMovies();
  const { data: tvSeriesAiringToday } = useTVSeriesAiringToday();


  
  return (
    <>
      <HomeSlider />

      {/* second section in Home  */}
      <section>
        <div className="py-8 px-16">
          <CategorySection data={trendingMovies} category="Trending Movies" mediaType= 'movie' />
          <CategorySection
            data={trendingSeries}
            category="Trending TV Series"
            mediaType= 'series'
          />
          <CategorySection data={upComingMovies} category="Upcoming Movies" mediaType= 'movie' />
          <CategorySection
            data={tvSeriesAiringToday}
            category="TV Series Airing Today"
            mediaType= 'tv'
          />
        </div>
      </section>
    </>
  );
}

export default Home;
