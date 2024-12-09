import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DetailsInfoSkeleton() {
  return (
    <SkeletonTheme
      baseColor="#181818"
      highlightColor="#333333"
      duration={1.5}
      enableAnimation={true}
    >
      <div className="movie-info flex flex-col md:flex-row gap-1.5 md:gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="status flex gap-2">
            {/* Skeleton for the label */}
            <Skeleton height="30px" width="70px" />
            {/* Skeleton for the value */}
            <Skeleton height="30px" width="100px" />
          </div>
        ))}
        {/* You can add more skeleton rows here for other details if needed */}
      </div>
    </SkeletonTheme>
  );
}

export default DetailsInfoSkeleton;
