import FeedHeader from '../components/FeedHeader';
import { getQuestionsList, getSubjectsList } from '../utils/getDataApi';
import QuestionsList from '../components/QuestionsList';
import { useEffect, useRef, useState } from 'react';
import CreateQuestionButton from '../components/CreateQuestionButton';

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

function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function FeedPage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    (async () => {
      const res = await withRetry(() => getSubjectsList(1, 50, 'name'));
      const subjects = (res?.results ?? []).slice(0, 15);

      setAllQuestions([]);

      const groups = chunkArray(subjects, 3);

      for (const group of groups) {
        const results = await Promise.all(
          group.map(async (subject) => {
            const subjectId = subject.id;
            const subjectName = subject.name ?? '익명';
            const qRes = await withRetry(() => getQuestionsList(subjectId, 0, 10));
            const list = qRes?.results ?? [];
            return list.map((q) => ({ ...q, subjectName }));
          }),
        );

        const merged = results.flat();
        if (merged.length > 0) {
          setAllQuestions((prev) => [...prev, ...merged]);
        }

        await sleep(20);
      }
    })();
  }, []);

  return (
    <>
      <FeedHeader />
      <QuestionsList questions={allQuestions} />
      <CreateQuestionButton />
    </>
  );
}
