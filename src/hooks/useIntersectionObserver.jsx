import { useEffect, useRef } from 'react';

export default function (callback, isScrollLoading, hasNextScroll) {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextScroll && !isScrollLoading) {
        callback();
        console.log('훅' + hasNextScroll);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasNextScroll, isScrollLoading]);

  return ref;
}
