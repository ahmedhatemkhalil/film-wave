import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function GenresSkeleton() {
  return (
    <>
      <SkeletonTheme
        baseColor="#181818"
        highlightColor="#333333"
        duration={1.5}
        enableAnimation={true}
      >
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              height="24px"
              width="90px"
              key={index}
              className=" px-5 py-1 rounded-3xl"
            ></Skeleton>
          ))}
        </div>
      </SkeletonTheme>
    </>
  );
}

export default GenresSkeleton;
