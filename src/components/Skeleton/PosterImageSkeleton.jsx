import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PosterImageSkeleton() {
  return (
    <SkeletonTheme
      baseColor="#181818"
      highlightColor="#333333"
      enableAnimation={true}
    >
      <div className="lg:w-[18rem] xl:w-[20rem]   rounded-md h-[480px] w-[300px] hidden max-975:block">
        <Skeleton className="w-full   max-w-xs md:max-w-[17rem] lg:w-full h-96" />
      </div>
    </SkeletonTheme>
  );
}

export default PosterImageSkeleton;
