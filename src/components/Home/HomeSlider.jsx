import React from "react";
import Slider from "react-slick";
import PosterImage from "../PosterImage/PosterImage";
import { Film, Info } from "react-feather";
import { useAllMoviesAndSeries } from "../Apis/MovieApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
  const { data: movies } = useAllMoviesAndSeries();
  const displayedMovies = movies?.slice(0, 5);
  var settings = {
    dots: false,
    speed: 500,
    infinite: true,
    slidesToShow: 1, //
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    arrows: false,
    autoplay: true,
    fade: true,

    // arrows: false
  };
  return (
    <Slider {...settings}>
      {displayedMovies?.map((movie) => {
        console.log(movie, "movie movie");
        const posterImage = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        const backgroundImage = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
        return (
          <div key={movie.id}>
            <div
              style={{ backgroundImage: `url(${backgroundImage})` }}
              className=" min-h-[60vh] sm:min-h-[70vh]  md:min-h-screen  bg-cover bg-center relative flex items-center   "
            >
              <div className=" layer absolute bg-black opacity-50 inset-0 z-0 "></div>

              <div className=" content gap-5 sm:gap-3  medium-lg:w-full  w-full md:w-3/4  mx-auto px-8 sm:px-16 flex justify-between z-10">
                {/* Left section with movie info */}

                <div className="first  w-full md:w-3/4 text-white medium-lg:w-full   flex flex-col justify-center">
                  <div className="mt-5 ">
                    <h1 className=" text-2xl sm:text-3xl md:text-5xl font-medium">
                      {movie.title || movie.original_title || "title"}
                    </h1>
                  </div>
                  {/* <div className="mt-5">
                    <h6 className=" mb-3">2024</h6>

                    <span className=" mr-7">Drama</span>
                    <span className=" mr-7">Romance</span>
                    <span className=" mr-7">Action</span>
                  </div> */}
                  <div className="mt-5">
                    <p>{movie.overview}</p>
                  </div>
                  {/* Buttons */}
                  <div className="buttons flex flex-col tablet:flex-row mt-6  w-full  md:w-2/3    ">
                    <button className=" hover:text-main-color transition-all ease-in-out duration-300 flex items-center justify-center tablet:my-0  border-none text-black py-2 tablet:py-3 px-8 tablet:px-2 tablet:w-2/5  text-center my-1 cursor-pointer bg-white ">
                      <Info size={30} className="mr-4" />
                      More Info
                    </button>
                    <button className=" flex items-center justify-center my-3 tablet:my-0  py-2 md:w-2/3 pl-7 pr-3    border-none text-black   text-center  tablet:ml-5  cursor-pointer bg-white opacity-50 ">
                      <Film size={30} className="mr-4" />
                      Watch Trailer
                    </button>
                  </div>
                </div>
                {/* Right section with image */}
                <PosterImage poster={posterImage} classes="swipe" />
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}
