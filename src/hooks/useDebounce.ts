import { useEffect, useState } from 'react';

const DEBOUNCE_DELAY = 750;

function useDebounce<T>(value: T, delay = DEBOUNCE_DELAY) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
