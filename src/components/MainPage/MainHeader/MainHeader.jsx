import { useNavigate } from 'react-router-dom';
import { GoQuestionsButton, Header, Arrow } from './MainHeader.styles';
import arrowRight from '../../../assets/SubjectsListPage/arrow-right.png';

export default function MainHeader() {
  const navigate = useNavigate();

  const handleGoToQuestions = () => {
    navigate('/list');
  };

  return (
    <Header>
      <GoQuestionsButton type="button" onClick={handleGoToQuestions}>
        질문하러 가기
        <Arrow src={arrowRight} alt="화살표 이미지" />
      </GoQuestionsButton>
    </Header>
  );
}
