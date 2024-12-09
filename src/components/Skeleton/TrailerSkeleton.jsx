import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"; // Import Skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton CSS
import { Youtube } from "react-feather";

function TrailerSkeleton() {
  return (
    <SkeletonTheme
      baseColor="#181818"
      highlightColor="#333333"
      duration={1.5}
      enableAnimation={true}
    >
      <div className="trailer flex flex-col items-center">
        <div className="max-w-full  md:max-w-5xl w-full relative">
          <Skeleton width="120px" height="30px" className=" mb-6 font-semibold">
            Trailer
          </Skeleton>

          <Skeleton className="aspect-video" width="100%"></Skeleton>
          <div className="absolute inset-0 flex justify-center items-center">
            <Youtube size={80} className="text-gray-400" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default TrailerSkeleton;
