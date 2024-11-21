import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const AUTH_HEADER = {
  Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
};

// Generic fetcher
const fetchData = async ({ endpoint, id, type, queryKey, pageParam }) => {
  let url = `${API_BASE_URL}${type}/${id || endpoint}`;
  if (endpoint === "videos" || endpoint === "similar" || endpoint === "credits") {
    url = `${API_BASE_URL}${type}/${id}/${endpoint}`;
  } else if (endpoint === "trending") {
    url = `${API_BASE_URL}trending/${type}/${queryKey || "day"}`;
  }
  
  const { data } = await axios.get(url, {
    params: { page: pageParam || 1 },
    headers: AUTH_HEADER,
  });

  return id ? data : { results: data?.results, nextPage: pageParam + 1, totalPage: data?.total_pages };
};

// Unified hooks
export const useDetails = (type, id) =>
  useQuery([`fetchDetails`, type, id], () => fetchData({ type, id }));

export const useList = (type, endpoint, queryKey = null) =>
  useInfiniteQuery(
    [`fetchList`, type, endpoint, queryKey],
    ({ pageParam }) =>
      fetchData({ type, endpoint, queryKey, pageParam }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextPage <= lastPage.totalPage ? lastPage.nextPage : undefined,
    }
  );

export const useTrailer = (type, id) =>
  useQuery([`fetchTrailer`, type, id], () =>
    fetchData({ type, id, endpoint: "videos" })
  );

export const useCast = (type, id) =>
  useQuery([`fetchCast`, type, id], () =>
    fetchData({ type, id, endpoint: "credits" })
  );

export const useRelated = (type, id) =>
  useQuery([`fetchRelated`, type, id], () =>
    fetchData({ type, id, endpoint: "similar" })
  );