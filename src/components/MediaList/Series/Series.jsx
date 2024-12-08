import { seriesLists } from "../../../data/series and movies lists";
import { useSeriesList } from "../../Apis/SeriesApi";
import MediaList from "../MediaList";

function Series() {
  return (
    <>
      <MediaList
        kind="tv"
        useMediaList={useSeriesList}
        mediaLists={seriesLists}
        title="Tv Series"
      />
    </>
  );
}

export default Series;
