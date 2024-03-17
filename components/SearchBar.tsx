import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?s=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for meals"
        className="input input-bordered w-full max-w-xs bg-white text-gray-800 placeholder-gray-400"
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
