import styles from './QuestionList.module.css';
import { useState } from 'react';

export default function QuestionList() {
  const [questionCount, setquestionCount] = useState(0);
  return (
    <>
      <div className={styles.questionListSection}>
        <p>{questionCount}개의 질문이 있습니다</p>
        <div className={styles.questionList}>
          <div className={styles.answerStatus}>
            <span>답변 완료</span>
          </div>
          <div className={styles.questionItems}>
            <p>질문</p>
            <span>좋아하는 동물은?</span>
          </div>
          <div className={styles.answerItems}></div>
          <hr />
          <div className={styles.reactionContainer}>
            <div>좋아요</div>
            <div>싫어요</div>
          </div>
        </div>
      </div>
    </>
  );
}
