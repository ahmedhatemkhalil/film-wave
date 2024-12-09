import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function OverViewSkeleton() {
  return (
    <>
      <SkeletonTheme
        baseColor="#181818"
        highlightColor="#333333"
        duration={1.5}
        enableAnimation={true}
      >
        <div className=" flex flex-col gap-3 md:gap-4">
          <Skeleton
            containerClassName="flex-1"
            width="150px"
            height="30px"
          ></Skeleton>
          <Skeleton count={4} width="100%"></Skeleton>
        </div>
      </SkeletonTheme>
    </>
  );
}

export default OverViewSkeleton;
