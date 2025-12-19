import styles from './QuestionsList.module.css';
import QuestionCard from './QuestionCard';
import QuestionIcon from '../assets/questionIcon.svg';

export default function QuestionsList({ questions }) {
  const list = Array.isArray(questions) ? questions : [];

  return (
    <div className={styles.questionListContainer}>
      <div className={styles.countTextSection}>
        <p className={styles.countText}>
          <img src={QuestionIcon} alt="Question Icon" />
          {list.length}개의 질문이 있습니다
        </p>
      </div>

      <div className={styles.list}>
        {list.map((question) => (
          <QuestionCard
            key={`${question.id}-${question.subjectName}`}
            question={question}
            subjectName={question.subjectName}
          />
        ))}
      </div>
    </div>
  );
}
