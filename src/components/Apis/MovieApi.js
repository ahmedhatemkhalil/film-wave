import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";

const API_BASE_URL = 'https://api.themoviedb.org/3/'
const AUTH_HEADER = {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN} `
}
// Handle special case for 'trending'
const fetchMovie = async ({ pageParam = 1, endpoint, type }) => {
    try {

        let url;

        if (endpoint === "trending") {
            const timeWindow = type || "day";
            url = `${API_BASE_URL}trending/movie/${timeWindow}`;
        } else {
            url = `${API_BASE_URL}${endpoint}${type ? `/${type}` : ''}`;
        }

        const { data } = await axios.get(url, {
            params: { page: pageParam },
            headers: AUTH_HEADER,
        });

        return {
            results: data?.results,
            nextPage: pageParam + 1,
            totalPage: data?.total_pages,
        };
    } catch (error) {
        console.log(error, 'Error Fetching Data')
        throw new Error("An error occurred while fetching the data.");
    }
};

export const useMovieList = (endpoint, type) => {
    const typeValue = endpoint === 'trending' && !type ? 'day' : type;

    return useInfiniteQuery(['fetchMovie', endpoint, type], ({ pageParam }) => fetchMovie({ pageParam, type: typeValue, endpoint }),
        {
            getNextPageParam: (lastPage) => {
                return lastPage.nextPage <= lastPage.totalPage ? lastPage.nextPage : undefined;
            },
        })
}
// fetching for all
const fetch = async (endpoint) => {
    try {

        const { data } = await axios.get(`${API_BASE_URL}${endpoint}`, { headers: AUTH_HEADER })
        if (!data.results) throw new Error('Invalid response format');

        return data.results;
    } catch (error) {
        console.log(error, 'Error Fetching Data')
        throw new Error("An error occurred while fetching the data.");
    }
}
export const getTrendingMovies = () => fetch('trending/movie/day') //fetch trending movies
export const getUpComingMovies = () => fetch('movie/upcoming')     //fetch upComing movies
export const getPopularMovies = () => fetch('movie/popular')         // fetch popular movies
export const getAllMoviesAndSeries = () => fetch('trending/all/day') //fetch all movies and series

// react query hooks
export const useTrendingMovies = () => useQuery('getTrendingMovies', getTrendingMovies)
export const useUpComingMovies = () => useQuery('getUpComingMovies', getUpComingMovies)
export const usePopularMovies = () => useQuery('getPopularMovies', getPopularMovies)
export const useAllMoviesAndSeries = () => useQuery('getAllMoviesAndSeries', getAllMoviesAndSeries)
