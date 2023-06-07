import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const isSSR = typeof window === 'undefined';

const useIsomorphicEffect = isSSR ? useEffect : useLayoutEffect;

function useBreakpoint<T extends object>(
  screens: T,
  breakpoint: string,
  defaultValue = false,
) {
  const [match, setMatch] = useState(defaultValue);
  const matchRef = useRef(defaultValue);

  useIsomorphicEffect(() => {
    if (!(!isSSR && 'matchMedia' in window)) {
      return undefined;
    }

    const track = () => {
      // @ts-expect-error accessing index with uncertain `screens` type
      const value = (screens[breakpoint] as string) ?? '999999px';
      const query = window.matchMedia(`(min-width: ${value})`);
      matchRef.current = query.matches;
      // eslint-disable-next-line eqeqeq
      if (matchRef.current != match) {
        setMatch(matchRef.current);
      }
    };

    track();
    window.addEventListener('resize', track);

    return () => {
      window.removeEventListener('resize', track);
    };
  });

  return match;
}

export default useBreakpoint;
