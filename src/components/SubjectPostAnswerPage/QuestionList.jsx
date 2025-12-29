import { useState, useEffect } from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import Messages from '../../assets/SubjectPostAnswerPage/Messages.png';
import Mailbox from '../../assets/SubjectPostAnswerPage/Mailbox.png';
import {
  getQuestionsList,
  deleteSubject,
  getSubjectById,
  deleteQuestion,
  rejectAnswer,
} from '../../utils/getDataApi';
import media from '../../utils/media';
import { useNavigate } from 'react-router-dom';
// styled-components

const QuestionListWrapper = styled.section`
  top: 423px;
  width: 100%;
  max-width: 716px;
  margin: 120px auto 160px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${media.mobile`
    width: 327px;
    top: 353px; 
  `}
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
  padding: 12px 24px;
  border-radius: 999px;
  width: 100px;
  height: 35px;
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  ${media.mobile`
    width: 70px;
    height: 25px;
    padding: 0;
    font-size: 10px;
  `}
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
  position: relative;

  ${media.mobile`
    align-items: center;
  `}
`;

const Count = styled.div`
  width: 184px;
  height: 25px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0;
  color: #542f1a;
  text-align: center;

  img {
    width: 24px;
    height: 24px;
    display: block;
    flex-shrink: 0;
  }

  span {
    white-space: nowrap;
  }

  ${media.mobile`
    width: 170px;
    height: 24px;
    font-size: 18px;
    line-height: 1;
    white-space: nowrap;
    

    img {
      width: 22px;
      height: 22px;
      display: block;
    }
  `}
`;

const QuestionListBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EmptyIllustration = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  
  width: 100%;
  height: 330px;
  margin-top: 4px;
  padding: 16px 24px 16px 24px;

  img {
    display: block;
    width: 150px;
    height: 154px;
    top: 534px;
  }
`;

// 메인 컴포넌트
function QuestionList({ subjectId }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!subjectId) return;
    async function loadSubject() {
      const data = await getSubjectById(subjectId);
      setSubject(data);
    }
    loadSubject();
  }, [subjectId]);

  // 질문 리스트 불러오기
  useEffect(() => {
    if (!subjectId) return;

    setLoading(true);
    getQuestionsList(subjectId, 0, 20)
      .then((data) => setQuestions(data?.results ?? []))
      .finally(() => setLoading(false));
  }, [subjectId]);

  // 전체 삭제
  const handleDeleteSubject = async () => {
    if (!window.confirm('해당 피드를 삭제하시겠습니까?')) return;

    try {
      await deleteSubject(subjectId);
      localStorage.setItem('subjectId', '');
      navigate('/');
    } catch (error) {
      console.error('피드 삭제', error);
      alert('피드 삭제에 실패했습니다.');
    }
  };

  // 개별 삭제
  const handleDeleteOne = async (questionId) => {
    if (!window.confirm('해당 질문을 삭제하시겠습니까?')) return;

    try {
      await deleteQuestion(questionId);
      setQuestions((prev) => prev.filter((q) => q.id !== questionId)); // 상태 갱신
    } catch (error) {
      console.error('삭제 실패', error);
      alert('질문 삭제에 실패했습니다.');
    }
  };

  // 답변 거절
  const handleRejectOne = async (questionId) => {
    if (!window.confirm('해당 질문을 거절하시겠습니까?')) return;

    try {
      const rejectedAnswer = await rejectAnswer(questionId);
      setQuestions((prev) => 
        prev.map((q) => 
          q.id === questionId 
          ? {...q, answer: rejectedAnswer } 
          : q
        )
      ); 
    } catch (error) {
      alert('질문 삭제에 실패했습니다.');
    }
  }

  const hasQuestions = questions.length > 0;

  return (
    <QuestionListWrapper>
      <QuestionListTop>
        <DeleteAllButton onClick={handleDeleteSubject}>삭제하기</DeleteAllButton>
      </QuestionListTop>

      <QuestionListContainer>
        <Count>
          {hasQuestions ? (
            <>
              <img src={Messages} alt="질문 아이콘" />
              <span>{questions.length}개의 질문이 있습니다</span>
            </>
          ) : (
            <>
              <img src={Messages} alt="질문 아이콘" />
              <span>아직 질문이 없습니다</span>
            </>
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
                  subject={subject} 
                  onReject={handleRejectOne}
                />  
              ))}
            </QuestionListBody>
          )}        
      </QuestionListContainer>
    </QuestionListWrapper>
  );
}

export default QuestionList;
