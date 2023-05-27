/* eslint-disable react/jsx-props-no-spreading */
import type { InputHTMLAttributes } from 'react';
import { useState, useEffect } from 'react';
import { Search } from 'react-iconly';

import { useDebounce } from '@/hooks';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onUpdate: (query: string) => void;
};

const SearchInput: React.FC<Props> = ({ onUpdate, ...props }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm);

  useEffect(() => {
    if (debouncedValue.trim() === '') {
      return;
    }

    onUpdate(debouncedValue.toLowerCase());
  }, [debouncedValue, onUpdate]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(searchTerm.toLowerCase());
  };

  return (
    <form
      role="search"
      className="bg-bg max-w-xs rounded-[20px] mb-4 mx-auto"
      onSubmit={submitHandler}
    >
      <div className="flex items-center px-4 py-3 gap-x-4">
        <button type="submit" className="text-subtleDark">
          <Search />
        </button>
        <input
          className="text-subtleDark placeholder:text-subtleLight bg-inherit"
          value={searchTerm}
          placeholder="Search by name..."
          aria-label="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          {...props}
        />
      </div>
    </form>
  );
};

export default SearchInput;
