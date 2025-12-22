import styles from './CreateQuestionButton.module.css';

export default function CreateQuestionButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={styles.createQuestionButton}>
      질문 작성하기
    </button>
  );
}
