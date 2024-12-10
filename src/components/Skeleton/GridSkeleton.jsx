import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function GridSkeleton() {
  return (
    <>
      <SkeletonTheme
        baseColor="#181818"
        highlightColor="#333333"
        duration={1.5}
        enableAnimation={true}
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="relative group">
            {/* Skeleton for Poster Image */}
            <Skeleton className="aspect-[1/1.5] rounded-md" />

            {/* Skeleton for Rating */}
            <div className="bottom-24 left-2 absolute">
              <Skeleton circle={true} width="30px" height="30px" />
            </div>

            {/* Skeleton for Title */}
            <div className="poster-details flex flex-col mt-4">
              <Skeleton height="20px" width="100%" />

              {/* Skeleton for Date */}
              <Skeleton height="15px" width="70%" className="mt-3" />
            </div>
          </div>
        ))}
      </SkeletonTheme>
    </>
  );
}

export default GridSkeleton;
