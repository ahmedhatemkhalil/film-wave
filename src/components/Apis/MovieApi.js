
import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";

const API_BASE_URL = 'https://api.themoviedb.org/3/'
const AUTH_HEADER = {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN} `
}


// fetching movie Details
const fetchMovieDetails = async (movie_id) => {
    const { data } = await axios.get(`${API_BASE_URL}movie/${movie_id}`, { headers: AUTH_HEADER })
    return data
}
export const useMovieDetails = (movie_id) => useQuery(['fetchMovieDetails', movie_id], () => fetchMovieDetails(movie_id), { enabled: Boolean(movie_id) })



//fetching movie trailer
const fetchMovieTrailer = async (movie_id) => {
    const { data } = await axios.get(`${API_BASE_URL}movie/${movie_id}/videos`, { headers: AUTH_HEADER })
    return data.results
}
export const useMovieTrailer = (movie_id) => useQuery(['fetchMovieTrailer', movie_id], () => fetchMovieTrailer(movie_id), { enabled: !!movie_id })




// fetching movies cast
const fetchMovieCast = async (movie_id) => {
    const { data } = await axios.get(`${API_BASE_URL}movie/${movie_id}/credits`, { headers: AUTH_HEADER })
    return data
}
export const useMovieCast = (movie_id) => useQuery(['fetchMovieCast', movie_id], () => fetchMovieCast(movie_id), { enabled: !!movie_id })




//fetching related movie
const fetchRelatedMovie = async (movie_id) => {
    const { data } = await axios.get(`${API_BASE_URL}movie/${movie_id}/similar`, { headers: AUTH_HEADER })
    return data.results
}
export const useRelatedMovie = (movie_id) => useQuery(['fetchRelatedMovie', movie_id], () => fetchRelatedMovie(movie_id), { enabled: !!movie_id })



//fetching movie pages
// Handle special case for 'trending'
const fetchMovie = async ({ pageParam = 1, endpoint, type }) => {
    let url;

    if (endpoint === "trending") {
        // Construct the URL specifically for 'trending'
        const timeWindow = type || "day"; // Default to 'day' if type is not provided
        url = `${API_BASE_URL}trending/movie/${timeWindow}`;
    } else {
        // Construct the URL for other endpoints
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
};

export const useMovieList = (endpoint, type) => {
    const typeValue = endpoint === 'trending' && !type ? 'day' : type;

    return useInfiniteQuery(['fetchMovie', endpoint, type], ({ pageParam }) => fetchMovie({ pageParam, type:typeValue, endpoint }),
        {
            getNextPageParam: (lastPage) => {
                return lastPage.nextPage <= lastPage.totalPage ? lastPage.nextPage : undefined;
            },
        })
}


// fetching for all
const fetch = async (endpoint) => {
    const { data  } = await axios.get(`${API_BASE_URL}${endpoint}`, { headers: AUTH_HEADER })
    if (!data.results) throw new Error('Invalid response format');
   
    return data.results;
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
