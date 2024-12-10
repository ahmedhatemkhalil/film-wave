import axios from "axios";
import React from "react";
import { Search, X } from "react-feather";
import { API_BASE_URL, AUTH_HEADER } from "./../Apis/ApiFetching";

function SearchBar({ setResults, searchType }) {
  const [isFocused, setIsFocused] = React.useState(false); //state variable to track whether the input field is focused.


  const [searchTerm, setSearchTerm] = React.useState(""); //The current search term input by the user.

  const [isPasting, setIsPasting] = React.useState(false); // state variable to track whether the user is pasting content into the input field.

  const fetchIndex = React.useRef(0); // useRef to keep track of the current fetch operation's index to prevent race conditions.

  async function getSearchFetch(term) {
    if (!term.trim()) {
      setResults([]);
      return;
    }
    const endpoint = searchType === "movie" ? "movie" : "tv";

    const currentFetchIndex = fetchIndex.current + 1;
    fetchIndex.current = currentFetchIndex;

    try {
      const { data } = await axios.get(
        `${API_BASE_URL}search/${endpoint}?include_adult=false&language=en-US&page=1&query=${term}`,
        { headers: AUTH_HEADER }
      );
      if (currentFetchIndex === fetchIndex.current) {
        setResults(data?.results?.length ? data.results : null);
      }
    } catch (error) {
      if (currentFetchIndex === fetchIndex.current) {
        console.error("Error fetching search results:", error);
        setResults(null);
      }
    } 
  }
  const handleChange = (e) => {
    if (!isPasting) {
      const { value } = e.target;
      setSearchTerm(value);
      getSearchFetch(value);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    setIsPasting(true);
    const value = e.clipboardData.getData("text").trim();
    if (value) {
      setSearchTerm(value);
      getSearchFetch(value);
    }

    setTimeout(() => {
      setIsPasting(false);
    }, 100);
  };

  const handleClean = () => {
    setSearchTerm("");
    setResults([]);
  };

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
          onChange={handleChange}
          onPaste={handlePaste}
          type="text"
          placeholder="...Search"
          className={`${
            isFocused
              ? "placeholder-transparent ease-in-out duration-300 transition-all pl-10"
              : "pl-10"
          } w-full text-lg py-1 border-0 focus:border-0 focus:outline-none  `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {searchTerm && (
          <button
            onClick={handleClean}
            className=" hover:text-mainColor absolute right-4 text-gray-500"
            aria-label="Clear search"
          >
            <X />
          </button>
        )}
      </div>
    </>
  );
}

export default SearchBar;
