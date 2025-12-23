import { useEffect, useRef } from 'react';

export default function useIntersectionObserver({
  callback,
  loadSubjectsScroll,
  isScrollLoading,
  hasNextScroll,
  isScrollMode,
}) {
  const ref = useRef(); //하단 로딩바 DOM과 연결해줄 useRef

  // observer가 감지됐을때 실행 할 콜백
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextScroll != null && !isScrollLoading) {
        loadSubjectsScroll();
        callback();
      }
    });

    //observer가 감지 할 대상 지정
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasNextScroll, isScrollLoading, isScrollMode]);

  return ref;
}
