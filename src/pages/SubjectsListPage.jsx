import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SubjectsListPageNav from '../components/SubjectListPage/SubjectsListPageNav';
import SortMenu from '../components/SubjectListPage/SortMenu';
import SubjectsList from '../components/SubjectListPage/SubjectsList';
import { getSubjectsList } from '../utils/getDataApi';
import useSortParam from '../hooks/useSortParam';
import usePaginationParam from '../hooks/usePaginationParam';
import Pagination from '../components/SubjectListPage/Pagination';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import media from '../utils/media';
import LoadingBar from '../utils/LoadingBar';

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

const EndMessage = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: var(--gray-20);
  font-family: 'pretendard';
  font-size: 20px;
  font-weight: 400;
  color: var(--gray-50);
`;

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ    react-component   ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

export default function SubjectsListPage() {
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const [scrollPage, setScrollPage] = useState(1);
  const [hasNextScroll, setHasNextScroll] = useState(true);
  const [scrollPageParams, setScrollPageParams] = useState([]);
  const [isScrollMode, setIsScrollMode] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(50);
  const { orderBy } = useSortParam();
  const { currentPage, setCurrentPage } = usePaginationParam();
  const isLoading = subjects.length == 0 ? true : false;

  const scrollArgs = {
    callback: () => setScrollPage((prev) => prev + 1),
    isScrollLoading,
    hasNextScroll,
    isScrollMode,
  };

  useEffect(() => {
    setSubjects([]);
    setCurrentPage(1);
  }, [isScrollMode]);

  // 반응형 그리드

  useEffect(() => {
    const sixGridMedia = window.matchMedia('(max-width: 863px)');

    const sixGridHandleChange = (e) => {
      setSubjects([]);
      if (e.matches) setPageSize(6);
      else setPageSize(8);
    };

    sixGridMedia.addEventListener('change', sixGridHandleChange);

    return () => sixGridMedia.removeEventListener('change', sixGridHandleChange);
  }, []);

  // API 호출 함수 for pagination

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
  // API 호출 함수 for infinite scroll
  async function loadSubjectsScroll() {
    if (scrollPageParams.includes(scrollPage)) {
      return;
    }

    setIsScrollLoading(true);

    try {
      const data = await getSubjectsList(scrollPage, 8, orderBy);

      setScrollPageParams((prev) => [...prev, scrollPage]);
      setSubjects((prev) => [...prev, ...data.results]);
      setHasNextScroll(data?.next);
    } catch (err) {
      console.log(err);
    } finally {
      setIsScrollLoading(false);
    }
  }

  // api 호출 실행

  useEffect(() => {
    if (isScrollMode) loadSubjectsScroll();
    else loadSubjects();
  }, [currentPage, orderBy, pageSize, scrollPage, isScrollMode]);

  // 스크롤 감지할 DOM에 연결 할 useRef 반환
  const scrollRef = useIntersectionObserver(scrollArgs);
  return (
    <div>
      <SubjectsListPageNav
        setIsScrollMode={setIsScrollMode}
        setScrollPage={setScrollPage}
        setScrollPageParams={setScrollPageParams}
        isScrollMode={isScrollMode}
      />
      <Container>
        <SortBox>
          <TitleSpan> 누구에게 질문할까요? </TitleSpan>
          <SortMenu />
        </SortBox>
        <SubjectsList subjects={subjects} isLoading={isLoading} pageSize={pageSize} />

        {!isScrollMode && <Pagination currentPage={currentPage} totalPages={totalPages} />}

        {isScrollMode && hasNextScroll ? (
          <LoadingBar ref={scrollRef}>로딩중</LoadingBar>
        ) : (
          isScrollMode && !hasNextScroll && <EndMessage>마지막 피드입니다.</EndMessage>
        )}
      </Container>
    </div>
  );
}
