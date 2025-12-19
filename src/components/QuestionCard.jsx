import styles from './QuestionCard.module.css';
import { useNavigate } from 'react-router-dom';
import profileImage from '../assets/profileImage.svg';

function QuestionDate(dateString) {
  if (!dateString) return '';
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return '오늘';
  if (days < 7) return `${days}일 전`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}주 전`;
  const months = Math.floor(days / 30);
  return `${months}개월 전`;
}

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
          <div className={styles.question}>
            <span className={styles.questionText}>질문</span>
            <span className={styles.dot}>·</span>
            <span className={styles.timeText}>{QuestionDate(question.createdAt)}</span>
          </div>
          <span className={styles.questionContent}>{question.content}</span>
        </div>

        <div className={styles.answerItems}>
          <img className={styles.profileImage} src={profileImage} alt="profile" />

          <div className={styles.questionLabel}>
            <div className={styles.metaLine}>
              <span className={styles.nickName}>{subjectName}</span>
            </div>

            {isAnswered && <p className={styles.answerContent}>{question.answer.content}</p>}
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
