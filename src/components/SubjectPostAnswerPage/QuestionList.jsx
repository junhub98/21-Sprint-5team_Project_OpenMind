import { useState, useEffect } from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import Messages from '../../assets/SubjectPostAnswerPage/Messages.png';
import Mailbox from '../../assets/SubjectPostAnswerPage/Mailbox.png';
import axios from '../../utils/axios';
import { getQuestionsList, createAnswer, deleteAnswer, updateAnswer } from '../../utils/getDataApi';


const QuestionListWrapper=styled.section`
  width: 100%;
  max-width: 720px;
  margin: 0 auto 160px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const QuestionListTop = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4px;
`;

const DeleteAllButton = styled.button`
  background-color: #542f1a;
    color: #ffffff;
    border: none;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 14px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }

    &.disabled {
      opacity: 0.4;
      pointer-events: none;
    }
`;

const QuestionListContainer = styled.div`
  background-color: #f7f2ed;
  border: 1px solid #e5d8cc;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 220px;
`;

const Count = styled.div `
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 16px;
  font-weight: 500;
  color: #542f1a;
  text-align: center;
  img {
    display: block;
  }
`;

const QuestionListBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EmptyIllustration = styled.div `
   display: flex;
   justify-content:center;
   height: 100px;
   margin-top: 4px;

   img {
    display: block;
   }
`;

// 메인 컴포넌트 API 연동
function QuestionList({ subjectId }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionsList(subjectId, 0, 20);
        const mapped = data.map(q => ({
          id: q.id,
          questionId: q.id,
          title: q.title,
          content: q.content,
          author: q.writer?.name ?? '익명',
          date: q.createdAt,
          answer: q.answer ? {
            id: q.answer.id,
            content: q.answer.content,
            isRejected: q.answer.isRejected,
            createdAt: q.answer.createdAt
          } : null
        }));
        setQuestions(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subjectId]);

  // 답변 생성
  const handleCreateAnswer = async (questionId, content) => {
    try {
      const newAnswer = await createAnswer(questionId, content);
      setQuestions(prev =>
        prev.map(q =>
          q.id === questionId
            ? { ...q, answer: { ...newAnswer } }
            : q
        )
      );
    } catch (error) {
      console.error('답변 생성 실패', error);
      alert('답변 생성 중 오류가 발생했습니다.');
    }
  };
// 답변 수정하기
  const handleUpdateAnswer = async (questionId, content, isRejected) => {
    try {
      const answerId = questions.find(q => q.id === questionId)?.answer?.id;
      if (!answerId) return;
      const updated = await updateAnswer(answerId, content, isRejected);
      setQuestions(prev =>
        prev.map(q =>
          q.id === questionId
            ? { ...q, answer: { ...updated } }
            : q
        )
      );
    } catch (error) {
      console.error('답변 수정 실패', error);
    }
  };
// 답변 삭제하기
  const handleDeleteAnswer = async (answerId) => {
    try {
      await deleteAnswer(answerId);
      setQuestions(prev =>
        prev.map(q =>
          q.answer?.id === answerId
            ? { ...q, answer: null }
            : q
        )
      );
    } catch (error) {
      console.error('답변 삭제 실패', error);
    }
  };

  const hasQuestions = questions.length > 0;

  return (
    <QuestionListWrapper>
      <QuestionListTop>
        <DeleteAllButton
          className={!hasQuestions ? 'disabled' : ''}
          onClick={() => setQuestions([])}
        >
          전체 삭제하기
        </DeleteAllButton>
      </QuestionListTop>

      <QuestionListContainer>
        <Count>
          {hasQuestions ? (
            <>
              <img src={Messages} alt="질문 아이콘" />
              <span>{questions.length}개의 질문이 있습니다</span>
            </>
          ) : (
            <span>{loading ? '불러오는중...' : '아직 질문이 없습니다'}</span>
          )}
        </Count>

        {!hasQuestions && !loading && (
          <EmptyIllustration>
            <img src={Mailbox} alt="메일 상자" />
          </EmptyIllustration>
        )}

        {hasQuestions && (
          <QuestionListBody>
            {questions.map(q => (
              <QuestionCard
                key={q.id}
                question={q}
                onCreateAnswer={handleCreateAnswer}
                onUpdateAnswer={handleUpdateAnswer}
                onDeleteAnswer={handleDeleteAnswer}
              />
            ))}
          </QuestionListBody>
        )}
      </QuestionListContainer>
    </QuestionListWrapper>
  );
}

export default QuestionList;