import styles from './QuestionsList.module.css';
import QuestionCard from '../QuestionCard/QuestionCard';
import QuestionIcon from '../../../assets/PersonalImages/questionIcon.svg';
import CreateQuestionCard from '../EmptyQuestionCard/CreateQuestionCard';

export default function QuestionsList({ questions }) {
  const list = Array.isArray(questions) ? questions : [];
  if (list.length === 0) {
    return <CreateQuestionCard />;
  }

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
          <QuestionCard key={question.id} question={question} subjectName={question.subjectName} />
        ))}
      </div>
    </div>
  );
}
