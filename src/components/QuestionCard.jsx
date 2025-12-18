import styles from './QuestionCard.module.css';
import { useNavigate } from 'react-router-dom';
import profileImage from '../assets/profileImage.svg';

export default function QuestionCard({ question, subjectName }) {
  const navigate = useNavigate();
  const isAnswered = Boolean(question.answer);

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionList}>
        <div className={styles.answerStatus}>
          <span>{isAnswered ? '답변 완료' : '미답변'}</span>
        </div>

        <div className={styles.questionItems}>
          <span className={styles.questionText}>질문</span>
          <span className={styles.questionContent}>{question.content}</span>
        </div>

        <div className={styles.answerItems}>
          <img className={styles.profileImage} src={profileImage} alt="profile" />
          <div className={styles.questionLabel}>
            <div className={styles.nickName}>
              <p>{subjectName}</p>
            </div>
            <p>{isAnswered ? question.answer.content : question.content}</p>
          </div>
        </div>
        <hr />

        <div className={styles.reactionContainer}>
          <div>좋아요 {question.like ?? 0}</div>
          <div>싫어요 {question.dislike ?? 0}</div>
        </div>
      </div>
    </div>
  );
}
