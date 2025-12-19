import FeedHeader from '../components/FeedHeader';
import { getQuestionsList, getSubjectById } from '../utils/getDataApi';
import QuestionsList from '../components/QuestionsList';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CreateQuestionButton from '../components/CreateQuestionButton';

export default function FeedPage() {
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subjectId');

  const BATCH = 3;

  const [questions, setQuestions] = useState([]);
  const [subjectName, setSubjectName] = useState('익명');

  const offsetRef = useRef(0);
  const hasMoreRef = useRef(true);
  const inFlightRef = useRef(false);
  const didInitRef = useRef(false);

  const loadMore = async () => {
    if (!subjectId) return;
    if (!hasMoreRef.current) return;
    if (inFlightRef.current) return;

    inFlightRef.current = true;

    const res = await getQuestionsList(subjectId, offsetRef.current, BATCH);
    const list = res?.results ?? res?.list ?? [];

    if (list.length === 0) {
      hasMoreRef.current = false;
      inFlightRef.current = false;
      return;
    }

    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setQuestions((prev) => [...prev, ...list.map((q) => ({ ...q, subjectName }))]);

    offsetRef.current += list.length;
    hasMoreRef.current = Boolean(res?.next);

    inFlightRef.current = false;
  };

  useEffect(() => {
    if (!subjectId) return;
    if (didInitRef.current) return;
    didInitRef.current = true;

    (async () => {
      const subject = await getSubjectById(subjectId);
      const name = subject?.name ?? '익명';
      setSubjectName(name);

      setQuestions([]);
      offsetRef.current = 0;
      hasMoreRef.current = true;
      inFlightRef.current = false;

      await loadMore();
      window.scrollTo({ top: 0, behavior: 'auto' });
    })();
  }, [subjectId]);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300;

      if (nearBottom) loadMore();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [subjectId, subjectName]);

  if (!subjectId) {
    return (
      <>
        <FeedHeader />
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <code>/FeedPage?subjectId=숫자</code> 로 접근해주세요
        </div>
        <CreateQuestionButton />
      </>
    );
  }

  return (
    <>
      <FeedHeader />
      <QuestionsList questions={questions} />
      <CreateQuestionButton />
    </>
  );
}
