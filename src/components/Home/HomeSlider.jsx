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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../Loading/Loading";

export default function HomeSlider() {

  const navigate = useNavigate();
  const { data: movies, isLoading: moviesLoading } = useAllMoviesAndSeries();
  const [activeTrailer, setActiveTrailer] = React.useState(null);
  const [activeMovieOrSeries, setActiveMovieOrSeries] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const displayedMovies = React.useMemo(() => movies?.slice(0, 5), [movies]);
  var settings = {
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
  };

  function handleMoreInfo(type, id) {
    navigate(`/details/${type}/${id}`);
  }

  function handleWatchTrailer(type, id, movie) {
    if (!type || !id) {
      console.error("Invalid parameters for trailer: type or id is missing.");
      return;
    }
    setActiveMovieOrSeries(movie);
    setActiveTrailer({ type, id });
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
    setActiveTrailer(null);
  };

  const { data: trailerData } = useTrailer(
    activeTrailer?.type,
    activeTrailer?.id
  );

  const trailerKey = trailerData?.results?.find(
    (video) => video?.type === "Trailer"
  )?.key;

  if (moviesLoading) {
    return <Loading />;
  }

  return (
    <Slider {...settings}>
      {displayedMovies?.map((movie) => {
        const posterImage = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        const backgroundImage = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

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
