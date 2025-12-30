import styles from './CreateQuestionCard.module.css';
import QuestionIcon from '../../../assets/PersonalImages/questionIcon.svg';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

=======
import Mailbox from '../../../assets/SubjectPostAnswerPage/Mailbox.png';
>>>>>>> fc8b0e183b8cf1c7c6ff7d05ecb2307542611f59
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
      <img className={styles.mailBox} src={Mailbox} alt="메일 상자" />
    </div>
  );
}
