import React, { useState, useCallback } from 'react';
import { CiSearch } from "react-icons/ci";
import debounce from 'lodash.debounce';

interface SearchProps {
  onSearch: (query: string) => void; // Callback to handle search
  placeholder?: string; // Optional placeholder for the input
}

const Search: React.FC<SearchProps> = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");


  const debouncedFetch = useCallback(debounce(onSearch, 300), [])
  
  const handleSearch = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    setQuery(value);
    debouncedFetch(value);
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="flex gap-2 items-center text-xs border-[1px] border-gray-400  p-1 rounded w-full">
      <CiSearch className='text-xl'/>
      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        className="outline-none w-full"
      />
    </div>
  );
};

export default Search;