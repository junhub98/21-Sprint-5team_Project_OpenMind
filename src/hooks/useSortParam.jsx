import { useSearchParams } from 'react-router-dom';

export default function useSortParam() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 페이지
  const orderBy = searchParams.get('orderBy') || 'time';

  // 페이지 변경
  const setOrderBy = (nextOption) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('orderBy', nextOption);
      return params;
    });
  };

  return { orderBy, setOrderBy };
}
