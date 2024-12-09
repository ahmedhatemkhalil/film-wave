import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function RelatedSkeleton() {
  return (
    <>
      <SkeletonTheme
        baseColor="#181818"
        highlightColor="#333333"
        duration={1.5}
        enableAnimation={true}
      >
        {/* the title of similar movies or tv-shows */}
        <div className="caption flex justify-between items-center  ">
          <Skeleton height="40px" width="220px">
            {" "}
          </Skeleton>
        </div>
        {/* poster */}
        <div className="movie mb-10 flex  gap-14 pb-8 mt-3">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="  poster     min-w-48 h-72 cursor-pointer  mb-20  relative group"
            >
              <Skeleton
                width="200px"
                height="250px"
                className=" aspect-[1/1.5] rounded-md"
                loading="lazy"
              />
              {/* Rating  */}
              <div className="bottom-20 left-2 absolute">
                <Skeleton circle={true} width="30px" height="30px" />
              </div>{" "}
              <div className="poster-details text-white ">
                <Skeleton
                  count={2}
                  height="20px"
                  width="100%"
                  className=" text-lg sm:text-xl break-words  whitespace-break-spaces   text-white mt-4  "
                ></Skeleton>
              </div>
            </div>
          ))}
        </div>
      </SkeletonTheme>
    </>
  );
}

export default RelatedSkeleton;
