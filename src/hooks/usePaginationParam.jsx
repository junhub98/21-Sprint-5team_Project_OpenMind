import { useSearchParams } from 'react-router-dom';

export default function usePaginationParam() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 페이지
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);

  // 페이지 변경
  const setCurrentPage = (nextPage) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', nextPage);
      return params;
    });
  };

  return { currentPage, setCurrentPage };
}
