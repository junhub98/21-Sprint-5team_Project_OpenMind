import { useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from './QuestionCard.module.css';
import KebabMenu from './KebabMenu';
import Reactions from '../../utils/Reactions';
import profileImage from '../../assets/PersonalImages/profileImage.svg';
import { parseSubjectName } from '../../utils/getDataApi';
import AnswerArea from './AnswerArea';

// styled-components
const Card = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(140, 140, 140, 0.25);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Status = styled.span`
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid;
  background-color: transparent;
  line-height: 1;

  color: ${(props) => (props.$done ? '#542f1a' : '#c8b6a6')};
  border-color: ${(props) => (props.$done ? '#542f1a' : '#c8b6a6')};
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;

const Meta = styled.div`
  font-size: 14px;
  color: #818181;
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid #e5d8cc;
  margin: 12px 0 0 0;
`;

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

// 메인컴포넌트
function QuestionCard({ question, onDelete, subject, onReject, onAnswerSubmit }) {
  const isAnswered = Boolean(question.answer);
  const isRejected = question.answer?.isRejected === true;

  const [isEdit, setIsEdit] = useState(false);
  const { name, tag } = parseSubjectName(subject?.name) || { name: '', tag: null };

  const handleAnswerDone = (answer) => {
    onAnswerSubmit(question.id, answer);
    setIsEdit(false);
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionList}>
        <div className={styles.answerStatus}>
          <span className={!isAnswered ? styles.notAnswered : undefined}>
            {isAnswered ? '답변 완료' : '미답변'}
          </span>
          <KebabMenu 
            question={question} 
            onDelete={onDelete} 
            onReject={onReject}
            setIsEdit={setIsEdit} 
          />
        </div>

        <div className={styles.questionItems}>
          <div className={styles.question}>
            <span className={styles.questionText}>질문</span>
            <span className={styles.dot}>·</span>
            <span className={styles.timeText}>{QuestionDate(question.createdAt)}</span>
          </div>
          <span className={styles.questionContent}>{question.content}</span>
        </div>

        {(!isAnswered || isEdit) && (
          <AnswerArea 
            question={question} 
            subject={subject} 
            isEdit={isEdit} 
            onSubmitDone={handleAnswerDone}
            
          />
        )}

        {isAnswered && !isEdit && (
          <div className={styles.answerItems}>
            <img className={styles.profileImage} src={subject.imageSource} alt="profile" />
            <div className={styles.questionLabel}>
              <div className={styles.metaLine}>
                <span className={styles.nickName}>{name}</span>
                <span className={styles.date}>{QuestionDate(question.answer.createdAt)}</span>
              </div>
              <p className={`${styles.answerContent} ${isRejected ? styles.rejected : ''}`}>
                {isRejected ? '답변 거절' : question.answer.content}
              </p>
            </div>
          </div>
        )}

        <hr />

        <Reactions question={question} />
      </div>
    </div>
  );
}

export default QuestionCard;
