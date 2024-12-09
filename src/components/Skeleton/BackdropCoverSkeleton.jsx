import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function BackdropCoverSkeleton() {
  return (
    <>
      <SkeletonTheme
        baseColor="#181818"
        highlightColor="#333333"
        duration={1.5}
        enableAnimation={true}
      >
        <div className="relative h-[65vh]">
          <Skeleton className="w-full h-full" />
        </div>
      </SkeletonTheme>
    </>
  );
}

export default BackdropCoverSkeleton;
