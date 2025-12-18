import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SubjectsListPageNav from '../components/SubjectsListPageNav';
import CustomSelect from '../components/CustomSelect';
import SubjectsList from '../components/SubjectsList';
import { getSubjectsList } from '../utils/getDataApi';
import useSortParam from '../hooks/useSortParam';
import usePaginationParam from '../hooks/usePaginationParam';
import Pagination from '../components/Pagination';
import media from '../utils/media';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
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

export default function QuestionsListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(50);
  const { orderBy } = useSortParam();
  const { currentPage } = usePaginationParam();

  useEffect(() => {
    console.log('currentPage changed:', currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 863) {
        //863px은 questionCard가 width 186px보다 작아지는 윈도우넓이
        setPageSize(6);
      } else {
        setPageSize(8);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function loadSubjects() {
      try {
        setIsLoading(true);
        const data = await getSubjectsList(currentPage, pageSize, orderBy);
        setSubjects(data.results);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadSubjects();
  }, [currentPage, orderBy, pageSize]);

  return (
    <div>
      <SubjectsListPageNav />
      <Container>
        <TitleBox>
          <TitleSpan> 누구에게 질문할까요? </TitleSpan>
          <CustomSelect />
        </TitleBox>
        <SubjectsList subjects={subjects} isLoading={isLoading} pageSize={pageSize} />

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Container>
    </div>
  );
}
