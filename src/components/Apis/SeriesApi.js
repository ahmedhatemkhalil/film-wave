import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";

const API_BASE_URL = 'https://api.themoviedb.org/3/'
const AUTH_HEADER = {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
}
// fetching series Details 
const fetchSeriesDetails = async (series_id) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}tv/${series_id}`, { headers: AUTH_HEADER });
        return data;
    } catch (error) {
        console.error('Error fetching series details:', error);
        throw error;
    }
};
export const useSeriesDetails = (series_id) => useQuery(['fetchSeriesDetails', series_id], () => fetchSeriesDetails(series_id), { enabled: !!series_id })

//fetching Series trailer
const fetchSeriesTrailer = async (series_id) => {
    const { data } = await axios.get(`${API_BASE_URL}tv/${series_id}/videos`, { headers: AUTH_HEADER })
    return data.results
}
export const useSeriesTrailer = (series_id) => useQuery(['fetchSeriesTrailer', series_id], () => fetchSeriesTrailer(series_id), { enabled: !!series_id })

// fetching series cast
const fetchSeriesCast = async (series_id) => {
    const { data } = await axios.get(`${API_BASE_URL}tv/${series_id}/credits`, { headers: AUTH_HEADER })
    return data
}
export const useSeriesCast = (series_id ) => useQuery(['fetchSeriesCast', series_id], () => fetchSeriesCast(series_id), { enabled: !!series_id })

//fetching related series
const fetchRelatedSeries = async (series_id) => {
    const { data } = await axios.get(`${API_BASE_URL}tv/${series_id}/similar`, { headers: AUTH_HEADER })
    return data.results
}
export const useRelatedSeries = (series_id) => useQuery(['fetchRelatedSeries', series_id], () => fetchRelatedSeries(series_id), { enabled: !!series_id })


//fetching movie pages
// Handle special case for 'trending'


const fetchSeries = async ({ pageParam = 1, endpoint, type }) => {
    let url
    if (endpoint === 'trending') {
        const timeWindow = type || 'day'
        url = `${API_BASE_URL}trending/tv/${timeWindow}`
    } else {
        url = `${API_BASE_URL}${endpoint}${type ? `/${type}` : ''}`
    }

    const { data } = await axios.get(url, {
        params: { page: pageParam, }, headers: AUTH_HEADER
    })

    return {
        results: data?.results,
        nextPage: pageParam + 1,
        totalPage: data?.total_pages,
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
    const { data } = await axios.get(`${API_BASE_URL}${endpoint}`, { headers: AUTH_HEADER })
    return data.results
}

export const getTrendingSeries = () => fetch('trending/tv/day')    //fetch trending tv series
export const getTVSeriesAiringToday = () => fetch('tv/airing_today') //fetch TV Series Airing Today 

export const useTrendingSeries = () => useQuery('getTrendingSeries ',getTrendingSeries)
export const useTVSeriesAiringToday = () => useQuery('getTVSeriesAiringToday',getTVSeriesAiringToday)
