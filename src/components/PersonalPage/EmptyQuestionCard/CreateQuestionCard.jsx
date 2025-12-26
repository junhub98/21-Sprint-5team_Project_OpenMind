import styles from './CreateQuestionCard.module.css';
import QuestionIcon from '../../../assets/PersonalImages/questionIcon.svg';

export default function CreateQuestionCard({ onClick }) {
  return (
    <div className={styles.CreateQuestionCard}>
      <p>
        {' '}
        <img src={QuestionIcon} alt="Question Icon" />
        아직 질문이 없습니다
      </p>
    </div>
  );
}
