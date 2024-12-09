import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CastSkeleton() {
  return (
    <SkeletonTheme
      baseColor="#181818"
      highlightColor="#333333"
      duration={1.5}
      enableAnimation={true}
    >
      <div className="cast gap-3 md:gap-4 flex flex-col">
        <Skeleton width="120px" height="30px"></Skeleton>
        <div className="cast-info justify-center 428:justify-start flex flex-wrap gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2 w-20">
              <Skeleton
                className="w-full h-28 bg-contain"
                containerClassName="flex-1"
              />
              <Skeleton height="22px" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default CastSkeleton;
