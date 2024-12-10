import React from "react";
import Slider from "react-slick";
import PosterImage from "../PosterImage/PosterImage";
import { useAllMoviesAndSeries } from "../Apis/MovieApi";
import { useNavigate } from "react-router-dom";
import Trailer from "../Details/Trailer";
import { useTrailer } from "../Apis/ApiFetching";
import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "react-feather";
import MovieInfo from "./MovieInfo";
import Loading from "../Loading/Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//constant
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

export default function HomeSlider() {
  const navigate = useNavigate();

  //Holds the data of movies and series fetched from the API
  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useAllMoviesAndSeries();

  const [activeTrailer, setActiveTrailer] = React.useState(null); //Keeps track of the movie or series for which the trailer is being shown.

  const [activeMovieOrSeries, setActiveMovieOrSeries] = React.useState(null); //Stores information about the movie or series whose trailer is currently active.

  const [isOpen, setIsOpen] = React.useState(false); // controls whether the trailer modal is open or closed

  const displayedMovies = React.useMemo(() => movies?.slice(0, 5), [movies]); //extract the first 5 movies from the movies data
  const settings = React.useMemo(
    () => ({
      dots: false,
      speed: 1000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 3000,
      arrows: false,
      autoplay: true,
      fade: true,
      pauseOnHover: false,
    }),
    []
  );

  //Takes type and id as arguments to navigate to the details page of the selected movie or series.
  function handleMoreInfo(type, id) {
    navigate(`/details/${type}/${id}`);
  }

  //This function is triggered when a user wants to watch a trailer for a movie or series.
  function handleWatchTrailer(type, id, movie) {
    if (!type || !id) {
      return;
    }
    setActiveMovieOrSeries(movie); //render the relevant movie or series information in the modal
    setActiveTrailer({ type, id }); //fetch the correct trailer from the API using just the type and ID.
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
    setActiveTrailer(null);
  };

  const { data: trailerData, error: trailerError } = useTrailer(
    activeTrailer?.type,
    activeTrailer?.id
  );

  const trailerKey = trailerData?.results?.find(
    (video) => video?.type === "Trailer"
  )?.key;

  if (moviesLoading || trailerError) {
    return <Loading />;
  }
  if (moviesError) {
    return <div>Error fetching movie data. Please try again later.</div>;
  }

  return (
    <Slider {...settings}>
      {displayedMovies?.map((movie) => {
        const posterImage = `${IMAGE_BASE_URL}${movie.poster_path}`;
        const backgroundImage = `${IMAGE_BASE_URL}${movie.backdrop_path}`;

        return (
          <div key={movie.id}>
            <div
              style={{ backgroundImage: `url(${backgroundImage})` }}
              className=" min-h-[60vh] sm:min-h-[70vh]  md:min-h-screen  bg-cover bg-center relative flex items-center   "
            >
              <div className=" layer absolute bg-black opacity-50 inset-0 w-full h-full z-0  "></div>

              <div className="  content gap-5 sm:gap-8    w-full md:w-full xl:w-[90%] 2xl:w-3/4   mx-auto px-8 sm:px-16 flex z-10">
                {/* Left section with movie info */}

                <MovieInfo
                  movie={movie}
                  handleMoreInfo={handleMoreInfo}
                  handleWatchTrailer={handleWatchTrailer}
                />
                <Dialog
                  open={isOpen}
                  onClose={handleCloseModal}
                  aria-label="Close trailer modal"
                  className="relative z-50"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-35"></div>

                  <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-4xl space-y-6 md:space-y-4 border bg-white p-2 md:p-4 lg:p-6 xl:p-8 relative">
                      <button
                        className="absolute top-0 lg:top-2 right-0 lg:right-4 xl:right-6 text-black text-xl"
                        onClick={handleCloseModal}
                      >
                        {" "}
                        <X size={30} />{" "}
                      </button>
                      {trailerKey ? (
                        <Trailer
                          trailerKey={trailerKey}
                          title={
                            activeMovieOrSeries?.title ||
                            activeMovieOrSeries?.name
                          }
                          showTitle={false}
                        />
                      ) : (
                        <Loading />
                      )}
                    </DialogPanel>
                  </div>
                </Dialog>
                {/* Right section with image */}
                <PosterImage
                  poster={posterImage}
                  altName={movie.name}
                  classes="swipe"
                />
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}
