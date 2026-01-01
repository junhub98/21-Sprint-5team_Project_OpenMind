// 질문 영역 담당 섹션 컴포넌트
import QuestionList from './QuestionList';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% { opacity:0; transform: translateY(20px); }
  100% { opacity:1; transform: translateY(0); }
`;

const FadeInBox = styled.div`
  animation: ${fadeIn} 0.6s ease forwards;
`;

function QuestionSection({ subjectId }) {
  return (
    <FadeInBox>
      <QuestionList subjectId={subjectId} />
    </FadeInBox>
  );
}

export default QuestionSection;
