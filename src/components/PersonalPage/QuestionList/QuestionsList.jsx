import styled, { keyframes } from 'styled-components';
import styles from './QuestionsList.module.css';
import QuestionCard from '../QuestionCard/QuestionCard';
import QuestionIcon from '../../../assets/PersonalImages/questionIcon.svg';
import CreateQuestionCard from '../EmptyQuestionCard/CreateQuestionCard';

const fadeIn = keyframes`
  0% { opacity:0; transform: translateY(20px); }
  100% { opacity:1; transform: translateY(0); }
`;

const FadeInBox = styled.div`
  animation: ${fadeIn} 0.6s ease forwards;
`;

export default function QuestionsList({ questions }) {
  const list = Array.isArray(questions) ? questions : [];

  if (questions.length == 0) {
    return (
      <FadeInBox>
        <CreateQuestionCard />
      </FadeInBox>
    );
  }

  return (
    <FadeInBox>
      <div className={styles.pageContainer}>
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
                key={question.id}
                question={question}
                subjectName={question.subjectName}
              />
            ))}
          </div>
        </div>
      </div>
    </FadeInBox>
  );
}
