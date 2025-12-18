import FeedHeader from '../components/FeedHeader';
import { getQuestionsList, getSubjectsList } from '../utils/getDataApi';
import QuestionsList from '../components/QuestionsList';
import { useEffect, useState } from 'react';

export default function FeedPage() {
  const subjectId = 12082;

  const [subjectName, setSubjectName] = useState('익명');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [subjectsData, questionsData] = await Promise.all([
          getSubjectsList(1, 100, 'name'),
          getQuestionsList(subjectId, 0, 10),
        ]);

        const found = subjectsData.results?.find((s) => s.id === subjectId);
        setSubjectName(found?.name ?? '익명');

        setQuestions(questionsData.results ?? []);
      } catch (e) {
        console.error('message:', e?.message);
      }
    }
    fetchData();
  }, [subjectId]);

  return (
    <>
      <FeedHeader />
      <QuestionsList questions={questions} subjectName={subjectName} />
    </>
  );
}
