import { useState, useEffect } from 'react';
import styles from './SubjectsListPage.module.scss';
import styled from 'styled-components';
import SubjectsListPageNav from '../components/SubjectsListPageNav';
import CustomSelect from '../components/CustomSelect';
import SubjectsList from '../components/SubjectsList';
import { getSubjectsList } from '../utils/getSubjectsApi';
import useSearchParam from '../hooks/useSearchParam';
import Pagination from '../components/Pagination';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function QuestionsListPage() {
  const [subjects, setSubjects] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(50);

  const { currentPage, orderBy } = useSearchParam();

  const sortOptions = [
    {
      name: '이름순',
      value: 'name',
    },

    {
      name: '최신순',
      value: 'time',
    },
  ];

  useEffect(() => {
    async function loadSubjects() {
      try {
        const data = await getSubjectsList(currentPage, pageSize, orderBy);
        setSubjects(data.results);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (err) {
        console.log(err);
      }
    }

    loadSubjects();
  }, [currentPage, orderBy, pageSize]);

  return (
    <div>
      <SubjectsListPageNav />
      <Container>
        <span className={styles.title}> 누구에게 질문할까요? </span>
        <CustomSelect sortOptions={sortOptions} />

        <SubjectsList subjects={subjects} />

        <Pagination totalPages={totalPages} />
      </Container>
    </div>
  );
}
