import { useState, useEffect } from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import Messages from '../../assets/SubjectPostAnswerPage/Messages.png';
import Mailbox from '../../assets/SubjectPostAnswerPage/Mailbox.png';
import { getQuestionsList, deleteAnswer } from '../../utils/getDataApi';

// styled-components
const QuestionListWrapper = styled.section`
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

const Count = styled.div`
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

const EmptyIllustration = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  margin-top: 4px;

  img {
    display: block;
  }
`;

// 메인 컴포넌트 
function QuestionList({ subjectId }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 질문 리스트 불러오기
  useEffect(() => {
    if (!subjectId) return;

    setLoading(true);
    getQuestionsList(subjectId, 0, 20)
      .then((data) => setQuestions(data?.results ?? []))
      .finally(() => setLoading(false));
  }, [subjectId]);

  // 전체 삭제 
  const handleDeleteAll = async () => {
    if (!window.confirm('모든 질문을 삭제하시겠습니까?')) return;
    
    try {
      const targets = questions.filter(q => q.answer);
      await Promise.all(
        targets.map( (q) => deleteAnswer(q.answer.id))    
      );
      setQuestions([]);
    } catch (error) {
        console.error('전체 질문 삭제', error)
        alert('전체 질문 삭제에 실패했습니다.');
    } 
  };

    // 개별 삭제
  const handleDeleteOne = async (id) => {
    const target = questions.find(q => q.id === id);
    if (!target) return;
    if (!window.confirm('해당 질문을 삭제하시겠습니까?')) return;

      try {
        if (target.answer?.id) await deleteAnswer(target.answer.id);
          setQuestions(prev => prev.filter(q => q.id !== id));
      } catch (error) {
          console.error('삭제 실패', error);
          alert('질문 삭제에 실패했습니다.');
      } 
  };
  
  // 개별 답변 업데이트
  const handleUpdateAnswer = (questionId, payload) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId
          ? { ...q, answer: payload?.answer ?? q.answer ?? null }
          : q
      )
    );
  };

  const hasQuestions = questions.length > 0;

  return (
    <QuestionListWrapper>
      <QuestionListTop>
        <DeleteAllButton
          className={!hasQuestions ? 'disabled' : ''}
          onClick={hasQuestions ? handleDeleteAll : null}
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
            <span>아직 질문이 없습니다</span>
          )}
        </Count>

        {!hasQuestions && (
          <EmptyIllustration>
            <img src={Mailbox} alt="메일 상자" />
          </EmptyIllustration>
        )}

        {hasQuestions && (
          <QuestionListBody>
            {questions.map((q) => (
              <QuestionCard
                key={q?.id}
                question={q}
                onDelete={handleDeleteOne}
                onUpdateAnswer={handleUpdateAnswer}
              />
            ) )}
          </QuestionListBody>
        )}
      </QuestionListContainer>
    </QuestionListWrapper>
  );
}

export default QuestionList;
