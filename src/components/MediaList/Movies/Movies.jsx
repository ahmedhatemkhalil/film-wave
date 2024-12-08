import { movieLists } from "../../../data/series and movies lists.js";
import { useMovieList } from "../../Apis/MovieApi.js";
import MediaList from "../MediaList.jsx";

function Movies() {
  return (
    <>
      <MediaList
        kind="movie"
        useMediaList={useMovieList}
        mediaLists={movieLists}
        title="Movies"
      />
    </>
  );
}

export default Movies;
