import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function RatingSkeleton() {
  return (
    <>
      <SkeletonTheme
        baseColor="#181818"
        highlightColor="#333333"
        enableAnimation={true}
      >
        <div className="flex items-center justify-center w-12 h-12">
          <Skeleton
            circle={true}
            containerClassName="flex-1"
            className="w-12 h-12"
          />
        </div>
        <Skeleton width="300px" height="30px" />
      </SkeletonTheme>
    </>
  );
}

export default RatingSkeleton;
