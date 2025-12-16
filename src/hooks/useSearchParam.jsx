// useSearchParam  Custom Hook
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function useSearchParam() {
  const [searchParams, setSearchParams] = useSearchParams({
    //관리할 상태 초기값 선언
    currentPage: 1,
    search: '',
  });
  // Url 표현돼야하는 상태들 관리
  const initKeyword = searchParams.get('search');
  const initPage = searchParams.get('currentPage');
  const [currentPage, setCurrentPage] = useState(initPage || 1);
  const [search, setSearch] = useState(initKeyword || '');

  // Url 표현돼야 하는 상태들 재선언 (searchParam 바뀔때)
  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('currentPage')) || 1;
    const keywordFromUrl = searchParams.get('search') || '';

    setCurrentPage(pageFromUrl);
    setSearch(keywordFromUrl);
  }, [searchParams]);

  // 필요한곳에서 가져다 쓰기
  return {
    searchParams,
    setSearchParams,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
  };
}
