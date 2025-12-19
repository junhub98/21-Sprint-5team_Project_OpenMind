import FeedHeader from '../components/FeedHeader';
import { getQuestionsList, getSubjectsList } from '../utils/getDataApi';
import QuestionsList from '../components/QuestionsList';
import { useEffect, useRef, useState } from 'react';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function withRetry(fn, { retries = 3, baseDelay = 400 } = {}) {
  let lastErr;
  for (let i = 0; i <= retries; i += 1) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      const status = e?.response?.status;
      if (status !== 429 || i === retries) throw e;
      await sleep(baseDelay * 2 ** i);
    }
  }
  throw lastErr;
}

export default function FeedPage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    async function fetchAll() {
      try {
        const res = await withRetry(() => getSubjectsList(1, 50, 'name'));
        const subjects = (res?.results ?? []).slice(0, 15);

        const merged = [];
        for (const subject of subjects) {
          const subjectId = subject.id;
          const subjectName = subject.name ?? '익명';

          const qRes = await withRetry(() => getQuestionsList(subjectId, 0, 10));
          const questions = qRes?.results ?? [];

          merged.push(
            ...questions.map((q) => ({
              ...q,
              subjectName,
            })),
          );

          await sleep(200);
        }

        setAllQuestions(merged);
      } catch (e) {
        console.error('message:', e?.message, e?.response?.status);
        setAllQuestions([]);
      }
    }

    fetchAll();
  }, []);

  return (
    <>
      <FeedHeader />
      <QuestionsList questions={allQuestions} />
    </>
  );
}
