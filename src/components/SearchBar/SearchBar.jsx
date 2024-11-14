import React from "react";
import { Search } from "react-feather";

function SearchBar() {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <>
      <div className=" max-w-sm   flex items-center relative ">
        <Search
          className={`absolute   transition-all duration-[] ease-in-out ${
            isFocused
              ? "text-mainColor left-auto right-0"
              : "text-gray-500  left-3"
          } `}
          strokeWidth={4}
          size={15}
        />
        <input
          type="text"
          placeholder="...Search"
          className={`${
            isFocused ? "placeholder-transparent pl-4" : "pl-10"
          }  w-full text-lg py-1 border-0 focus:border-0 focus:outline-none `}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </div>
    </>
  );
}

export default SearchBar;
