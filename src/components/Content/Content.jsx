import React from 'react'
import HeroBanner from '../HeroBanner/HeroBanner'
import { movieLists } from '../../data/series and movies lists'
import { NavLink, useLocation } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import GridItems from '../GridItems/GridItems'
import Loading from '../Loading/Loading'


function Content() {
    
    const location = useLocation();

    React.useEffect(() => {
      window.scrollTo(0, 0); 
    }, [location]);
    const [movies, setMovies] = React.useState([]);
    const [isSearching, setIsSearching] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const observerRef = React.useRef();
    
    
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
  
    if (isLoading && !isFetchingNextPage) {
      return <Loading />;
    }
    if (error) {
      return <div>Error fetching details: {error.message}</div>;
    }
  
    const handleSearch = (results) => {
      setMovies(results || []);
      setIsSearching(results === null);
      setIsPaused(results !== null);
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

          <SearchBar
            searchType="movie"
            setResults={handleSearch}
            isLoading={isLoading}
          />

          {isSearching && movies.length === 0 ? (
            <p className="text-white text-xl">
              Couldn't find anything related to your search query.
            </p>
          ) : (
            <div className="   movie grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-10">
              {(movies?.length > 0 ? movies : defaultMovies).map(
                (
                  { id, vote_average, poster_path, title, release_date },
                  index
                ) => (
                  <GridItems
                    type="movie"
                    id={id}
                    rate={vote_average}
                    key={`${id}-${index}`}
                    posterImage={
                      poster_path
                        ? `https://image.tmdb.org/t/p/original${poster_path}`
                        : defaultPhoto
                    }
                    name={title}
                    date={release_date}
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
  )
}

export default Content