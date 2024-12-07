import axios from "axios";
import { useQuery } from "react-query";

export const API_BASE_URL = "https://api.themoviedb.org/3/";
export const AUTH_HEADER = {
  Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
};

const fetchData = async ({ endpoint, id, type }) => {
  try {
    let url = `${API_BASE_URL}`

    //trending endpoint
    if (endpoint === 'trending') {
      if (!type) { throw new Error('type is required for the "trending" endpoint') }
      url += `trending/${type}/day`

      //nested endpoint 'videos , similar , credits'
    } else if (['videos', 'credits', 'similar'].includes(endpoint)) {
      if (!type || !id) {
        throw new Error(`type and id are required for the '${endpoint}' endpoint. `)
      }
      url += `${type}/${id}/${endpoint}`
    }
    // for details
    else if (type && id) {
      url += `${type}/${id}`
    }
    //endpoints without any type and id
    else if (endpoint) {
      url += `${endpoint}`
    }

    else {
      throw new Error("Insufficient parameters to construct the API URL.");

    }
    const { data } = await axios.get(url, { headers: AUTH_HEADER })

    return id ? data : { results: data?.results || [] }
  }
  catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("An error occurred while fetching the data.");
  }
}

export const useDetails = (type, id) =>
  useQuery([`fetchDetails`, type, id], () => fetchData({ type, id }), { enabled: Boolean(type && id) });


export const useTrailer = (type, id) =>
  useQuery([`fetchTrailer`, type, id], () =>
    fetchData({ type, id, endpoint: "videos" }), { enabled: Boolean(type && id) }
  );


export const useCast = (type, id) =>
  useQuery([`fetchCast`, type, id], () =>
    fetchData({ type, id, endpoint: "credits" }), { enabled: Boolean(type && id) }
  );

export const useRelated = (type, id) =>
  useQuery([`fetchRelated`, type, id], () =>
    fetchData({ type, id, endpoint: "similar" }), { enabled: Boolean(type && id) }
  );

