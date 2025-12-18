import { useNavigate } from 'react-router-dom';
import { GoQuestionsButton, Header } from './MainHeader.styles';

export default function MainHeader() {
  const navigate = useNavigate();

  const handleGoToQuestions = () => {
    navigate('/list');
  };

  return (
    <Header>
      <GoQuestionsButton
        type="button"
        onClick={handleGoToQuestions}
      >
        질문하러 가기 →
      </GoQuestionsButton>
    </Header>
  );
}


