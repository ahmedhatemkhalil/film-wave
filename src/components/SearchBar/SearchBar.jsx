import axios from "axios";
import React from "react";
import { Search } from "react-feather";
import { API_BASE_URL, AUTH_HEADER } from "./../Apis/ApiFetching";

function SearchBar({ setResults, searchType }) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  async function getSearchFetch() {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }
    const endpoint = searchType === "movie" ? "movie" : "tv";

    try {
      const res = await axios.get(
        `${API_BASE_URL}search/${endpoint}?include_adult=false&language=en-US&page=1&query=${searchTerm}`,
        { headers: AUTH_HEADER }
      );

      if (res?.data?.results?.length === 0) {
        setResults(null);
      } else {
        setResults(res?.data?.results);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults(null);
    }
  }

  return (
    <>
      <div className="max-w-sm flex items-center relative">
        <Search
          className={`absolute transition-all duration-[] ease-in-out ${
            isFocused
              ? "text-mainColor left-auto right-0"
              : "text-gray-500 left-3"
          }`}
          strokeWidth={4}
          size={15}
        />
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            getSearchFetch();
          }}
          type="text"
          placeholder="...Search"
          className={`${
            isFocused ? "placeholder-transparent pl-4" : "pl-10"
          } w-full text-lg py-1 border-0 focus:border-0 focus:outline-none`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </>
  );
}

export default SearchBar;
