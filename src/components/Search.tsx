import React, { useState, useCallback } from 'react';
import { CiSearch } from "react-icons/ci";
import debounce from 'lodash.debounce';

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  // Use debounce inside useCallback to avoid recreating the function on every render
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value.trim());
    }, 300),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="flex gap-2 items-center text-xs border-[1px] border-gray-400 p-2 rounded w-full">
      <CiSearch className='text-xl'/>
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="outline-none w-full"
      />
    </div>
  );
};

export default Search;