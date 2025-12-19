import styles from './CreateQuestionButton.module.css';

export default function CreateQuestionButton() {
  return (
    <button type="button" className={styles.createQuestionButton} alt={'Create Question'}>
      질문 작성하기
    </button>
  );
}
