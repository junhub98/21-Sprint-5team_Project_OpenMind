import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SubjectsListPageNav from '../components/SubjectListPage/SubjectsListPageNav';
import SortMenu from '../components/SubjectListPage/SortMenu';
import SubjectsList from '../components/SubjectListPage/SubjectsList';
import { getSubjectsList } from '../utils/getDataApi';
import useSortParam from '../hooks/useSortParam';
import usePaginationParam from '../hooks/usePaginationParam';
import Pagination from '../components/SubjectListPage/Pagination';

import media from '../utils/media';
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ    styled-components   ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SortBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px 0;

  ${media.mobile`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 24px;
  `}
`;

const TitleSpan = styled.span`
  font-family: 'pretendard';
  font-size: 40px;
  font-weight: 400;
  color: var(--gray-60);

  ${media.mobile`
    font-size: 24px;
  `}
`;

const ScrollLoading = styled.span`
  width: 100%;
  height: 150px;
  background-color: black;
  color: white;
`;
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ    react-component   ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

export default function SubjectsListPage() {
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const [scrollPage, setScrollPage] = useState(1);
  const [hasNextScroll, setHasNextScroll] = useState(true);
  const [scrollPageParams, setScrollPageParams] = useState([1]);
  const [isScrollMode, setIsScrollMode] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(50);
  const { orderBy } = useSortParam();
  const { currentPage } = usePaginationParam();
  const isLoading = subjects.length == 0 ? true : false;

  const scrollRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextScroll != null && !isScrollLoading) {
        setScrollPage((prev) => prev + 1);
      }
    });
    if (scrollRef.current) observer.observe(scrollRef.current);
    return () => {
      if (scrollRef.current) observer.unobserve(scrollRef.current);
    };
  }, [hasNextScroll, isScrollLoading]);

  useEffect(() => {
    const sixGridMedia = window.matchMedia('(max-width: 863px)');

    const sixGridHandleChange = (e) => {
      if (e.matches) setPageSize(6);
      else setPageSize(8);
    };

    sixGridMedia.addEventListener('change', sixGridHandleChange);

    return () => sixGridMedia.removeEventListener('change', sixGridHandleChange);
  }, []);

  async function loadSubjects() {
    try {
      const data = await getSubjectsList(currentPage, pageSize, orderBy);
      setSubjects(data.results);

      const nextTotalPages = Math.ceil(data.count / pageSize);
      if (totalPages != nextTotalPages) {
        setTotalPages(nextTotalPages);
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log('렌더링');
  async function loadSubjectsScroll() {
    if (scrollPageParams.includes(scrollPage)) {
      return;
    }
    setIsScrollLoading(true);
    console.log(scrollPageParams);
    console.log(scrollPage);
    console.log(scrollPageParams.includes(scrollPage));
    try {
      setScrollPageParams((prev) => [...prev, scrollPage]);
      const data = await getSubjectsList(scrollPage, 3, orderBy);
      setSubjects((prev) => [...prev, ...data.results]);
      setHasNextScroll(data?.next);
    } catch (err) {
      console.log(err);
    } finally {
      setIsScrollLoading(false);
    }
  }

  useEffect(() => {
    if (isScrollMode) loadSubjectsScroll();
    else loadSubjects();
  }, [currentPage, orderBy, pageSize, scrollPage]);

  return (
    <div>
      <SubjectsListPageNav />
      <Container>
        <SortBox>
          <TitleSpan> 누구에게 질문할까요? </TitleSpan>
          <SortMenu />
        </SortBox>
        <SubjectsList subjects={subjects} isLoading={isLoading} pageSize={pageSize} />

        {isScrollMode ? (
          <ScrollLoading ref={scrollRef}>로딩중</ScrollLoading>
        ) : (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </Container>
    </div>
  );
}
