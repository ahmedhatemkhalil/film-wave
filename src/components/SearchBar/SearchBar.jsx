import axios from "axios";
import React from "react";
import { Search, X } from "react-feather";
import { API_BASE_URL, AUTH_HEADER } from "./../Apis/ApiFetching";

function SearchBar({ setResults, searchType }) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  async function getSearchFetch() {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    const endpoint = searchType === "movie" ? "movie" : "tv";

    try {
      const { data } = await axios.get(
        `${API_BASE_URL}search/${endpoint}?include_adult=false&language=en-US&page=1&query=${searchTerm}`,
        { headers: AUTH_HEADER }
      );

      setResults(data?.results?.length ? data.results : null);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults(null);
    }
  }

  return (
    <>
      <div className="max-w-sm flex items-center relative">
        <Search
          className={`absolute left-4  ${
            isFocused ? "text-mainColor  " : "text-gray-500 "
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
            isFocused
              ? "placeholder-transparent ease-in-out duration-300 transition-all pl-10"
              : "pl-10"
          } w-full text-lg py-1 border-0 focus:border-0 focus:outline-none`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}

        />
        
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setResults([]);
            }}
            className=" hover:text-mainColor absolute right-4 text-gray-500"
            aria-label="Clear search"

          >
            <X/>
          </button>
        )}
      </div>
    </>
  );
}

export default SearchBar;
