import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";

const API_BASE_URL = 'https://api.themoviedb.org/3/'
const AUTH_HEADER = {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
}
//fetching series pages
// Handle special case for 'trending'
const fetchSeries = async ({ pageParam = 1, endpoint, type }) => {

    try {

        let url
        if (endpoint === 'trending') {
            const timeWindow = type || 'day'
            url = `${API_BASE_URL}trending/tv/${timeWindow}`
        } else if (endpoint === 'tv') {
            if (!type) {
                type = 'popular'
                throw new Error('Type must be provided when the endpoint is "tv".');
            }
            url = `${API_BASE_URL}tv/${type}?page=${pageParam}`;
        } else {
            throw new Error('Invalid endpoint');
        }
        console.log('Constructed URL:', url);


        const { data } = await axios.get(url, {
            params: { page: pageParam, }, headers: AUTH_HEADER
        })

        return {
            results: data?.results,
            nextPage: pageParam + 1,
            totalPage: data?.total_pages,
        }
    } catch (error) {
        console.log(error, 'Error Fetching Data')
        throw new Error("An error occurred while fetching the data.");
    }
}
export const useSeriesList = (endpoint, type) => {
    return useInfiniteQuery(['fetchSeries', endpoint, type], ({ pageParam }) => fetchSeries({ pageParam, type: endpoint === 'trending' && !type ? 'day' : type, endpoint }),
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
        return data.results
    } catch (error) {
        console.log(error, 'Error Fetching Data')
        throw new Error("An error occurred while fetching the data.")
    }
}

export const getTrendingSeries = () => fetch('trending/tv/day')
export const getTVSeriesAiringToday = () => fetch('tv/airing_today')

export const useTrendingSeries = () => useQuery('getTrendingSeries ', getTrendingSeries)
export const useTVSeriesAiringToday = () => useQuery('getTVSeriesAiringToday', getTVSeriesAiringToday)
