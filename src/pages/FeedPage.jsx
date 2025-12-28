import FeedHeader from '../components/PersonalPage/FeedHeader/FeedHeader';
import { getQuestionsList, getSubjectById } from '../utils/getDataApi';
import QuestionsList from '../components/PersonalPage/QuestionList/QuestionsList';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreateQuestionButton from '../components/PersonalPage/CreateQuestionButton/CreateQuestionButton';
import styles from './FeedPage.module.css';
import ModalCreateQuestion from '../utils/ModalCreateQuestion';
import ProfileHeader from '../components/SubjectPostAnswerPage/ProfileHeader';

export default function FeedPage() {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const BATCH = 3;

  const [questions, setQuestions] = useState([]);
  const [subjectName, setSubjectName] = useState('익명');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const offsetRef = useRef(0);
  const hasMoreRef = useRef(true);
  const inFlightRef = useRef(false);
  const didInitRef = useRef(false);

  const loadMore = useCallback(async () => {
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
  }, [subjectId, subjectName]);

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
  }, [subjectId, loadMore]);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300;

      if (nearBottom) loadMore();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadMore]);

  return (
    <div className={styles.feedPage}>
      <ProfileHeader subjectId={subjectId} />
      <QuestionsList questions={questions} />
      <CreateQuestionButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <ModalCreateQuestion
          isOpen={isModalOpen}
          setOnClose={() => setIsModalOpen(false)}
          subjectId={subjectId}
        />
      )}
    </div>
  );
}
