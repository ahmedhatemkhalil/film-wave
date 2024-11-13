import React from "react";
import { Info, Film } from "react-feather";
import myImage from "../../assets/poster.jpg";
function Home() {
  return (
    <>
      <header>
        <div className=" min-h-[60vh] sm:min-h-[70vh]  md:min-h-screen bg-heroImage bg-cover bg-center relative flex items-center   ">
          <div className=" layer absolute bg-black opacity-50 inset-0 z-0 "></div>

          <div className=" content gap-5 sm:gap-3 bg-gray-500 medium-lg:w-full  w-full md:w-3/4  mx-auto px-8 sm:px-16 flex justify-between z-10">
            {/* Left section with movie info */}
            <div className="first  w-full md:w-3/4 text-white medium-lg:w-full  bg-yellow-300 flex flex-col justify-center">
              <div className="mt-5 ">
                <h1 className=" text-2xl sm:text-3xl md:text-5xl font-medium">
                  Harry Potter
                </h1>
              </div>
              <div className="mt-5">
                <h6 className=" mb-3">2024</h6>

                <span className=" mr-7">Drama</span>
                <span className=" mr-7">Romance</span>
                <span className=" mr-7">Action</span>
              </div>
              <div className="mt-5">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                  animi!
                </p>
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
            <div className="second  bg-red-700 pr-10 hidden md:block w-[15rem] lg:w-[18rem] xl:w-[20rem] rounded-md    ">
              <img src={myImage} alt="" className="" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Home;
