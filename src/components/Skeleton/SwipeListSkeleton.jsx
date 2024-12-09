import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function SwipeListSkeleton() {
  return (
    <SkeletonTheme
      baseColor="#181818"
      highlightColor="#333333"
      duration={1.5}
      enableAnimation={true}
    >
      <div className="relative">
        {/* Skeleton Placeholder for scrolling */}
        <div className="movie mb-10 flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-8">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="poster min-w-48 h-72 cursor-pointer flex-shrink-0 mb-20 relative group"
            >
              {/* Skeleton Placeholder for Image */}
              <Skeleton className="aspect-[1/1.5] rounded-md" />
              <div className="shadow-layer absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition duration-300"></div>

              {/* Skeleton Placeholder for Rating */}
              <div className="bottom-20 left-2 absolute">
                <Skeleton circle={true} width="30px" height="30px" />
              </div>

              {/* Skeleton Placeholder for Title */}
              <div className="poster-details text-white">
                <Skeleton width="70%" height="20px" className="mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default SwipeListSkeleton;
