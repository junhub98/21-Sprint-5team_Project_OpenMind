import { useEffect, useRef } from 'react';

export default function ({ callback, isScrollLoading, hasNextScroll, isScrollMode }) {
  const ref = useRef();

  useEffect(() => {
    console.log(isScrollMode);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextScroll != null && !isScrollLoading) {
        callback();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasNextScroll, isScrollLoading, isScrollMode]);

  return ref;
}
