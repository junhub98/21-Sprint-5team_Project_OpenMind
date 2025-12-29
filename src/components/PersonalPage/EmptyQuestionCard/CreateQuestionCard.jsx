import styles from './CreateQuestionCard.module.css';
import QuestionIcon from '../../../assets/PersonalImages/questionIcon.svg';
import { useNavigate } from 'react-router-dom';

export default function CreateQuestionCard({ onClick }) {
  const navigate = useNavigate();
  return (
    <div className={styles.CreateQuestionCard}>
      <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      <p>
        {' '}
        <img src={QuestionIcon} alt="Question Icon" />
        아직 질문이 없습니다
      </p>
    </div>
  );
}
