import React from "react";
import TextTruncate from "react-text-truncate";

function OverView({ overview }) {
  const [isExpand, setIsExpand] = React.useState(false);
  const toggleExpand = () => setIsExpand(!isExpand);

  if (!overview) {
    return <p className="text-gray-300">No overview available.</p>;
  }

  return (
    <>
      <div className="  over-view-section flex flex-col gap-3 md:gap-4">
        <h2 className="text-3xl text-white">Overview</h2>
        {isExpand ? (
          <p onClick={toggleExpand} className="text-lg text-gray-300">
            {overview}
            <button
              aria-label="Collapse the overview text"
              onClick={toggleExpand}
              className="text-mainColor hover:underline"
            >
              {" "}
              Show less{" "}
            </button>
          </p>
        ) : (
          <TextTruncate
            line={3}
            element="p"
            truncateText="..."
            text={overview}
            textTruncateChild={
              <button
                aria-label="Expand the overview text"
                onClick={toggleExpand}
                className="text-mainColor hover:underline"
              >
                Show More
              </button>
            }
          />
        )}
      </div>
    </>
  );
}

export default OverView;
