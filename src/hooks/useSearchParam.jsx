// useSearchParam  Custom Hook
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function useSearchParam() {
  const [searchParams, setSearchParams] = useSearchParams({
    //관리할 상태 초기값 선언
    currentPage: 1,
    orderBy: 'time',
  });
  // Url 표현돼야하는 상태들 관리

  const initPage = searchParams.get('currentPage');
  const initOrder = searchParams.get('orderBy');
  const [currentPage, setCurrentPage] = useState(initPage || 1);
  const [orderBy, setOrderBy] = useState(initOrder || 'time');

  // Url 표현돼야 하는 상태들 재선언 (searchParam 바뀔때)
  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('currentPage')) || 1;
    const orderFromUrl = searchParams.get('orderBy') || 'time';

    setCurrentPage(pageFromUrl);
    setOrderBy(orderFromUrl);
  }, [searchParams]);

  // 필요한곳에서 가져다 쓰기
  return {
    searchParams,
    setSearchParams,
    currentPage,
    setCurrentPage,
    orderBy,
    setOrderBy,
  };
}
