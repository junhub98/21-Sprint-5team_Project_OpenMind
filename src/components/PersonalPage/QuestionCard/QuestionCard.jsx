import React, { useState } from 'react';
import styles from './QuestionCard.module.css';
import profileImage from '../../../assets/PersonalImages/profileImage.svg';
import ThumbsUp from '../../../assets/PersonalImages/thumbsUp.svg?react';
import ThumbsDown from '../../../assets/PersonalImages/thumbsDown.svg?react';
import { likeQuestion, dislikeQuestion, parseSubjectName } from '../../../utils/getDataApi';
import Reactions from '../../../utils/Reactions';
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

function QuestionCard({ question, subjectName }) {
  const isAnswered = Boolean(question.answer);
  const isRejected = question.answer?.isRejected === true;
  const { name } = parseSubjectName(question.subjectName || subjectName) || { name: question.subjectName || subjectName || '익명', tag: null };

  const [likeCount, setLikeCount] = useState(question.like || 0);
  const [dislikeCount, setDislikeCount] = useState(question.dislike || 0);
  const [saving, setSaving] = useState(false);

  const handleLike = async () => {
    if (saving) return;

    setSaving(true);
    setLikeCount((prev) => prev + 1);

    try {
      await likeQuestion(question.id);
    } catch (e) {
      setLikeCount((prev) => prev - 1);
    } finally {
      setSaving(false);
    }
  };

  const handleDislike = async () => {
    if (saving) return;

    setSaving(true);
    setDislikeCount((prev) => prev + 1);

    try {
      await dislikeQuestion(question.id);
    } catch (e) {
      setDislikeCount((prev) => prev - 1);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionList}>
        <div className={styles.answerStatus}>
          <span className={!isAnswered ? styles.notAnswered : undefined}>
            {isAnswered ? '답변 완료' : '미답변'}
          </span>
        </div>

        <div className={styles.questionItems}>
          <div className={styles.question}>
            <span className={styles.questionText}>질문</span>
            <span className={styles.dot}>·</span>
            <span className={styles.timeText}>{QuestionDate(question.createdAt)}</span>
          </div>
          <span className={styles.questionContent}>{question.content}</span>
        </div>

        {isAnswered && (
          <div className={styles.answerItems}>
            <img className={styles.profileImage} src={question.subjectImageSource || profileImage} alt="profile" />
            <div className={styles.questionLabel}>
              <div className={styles.metaLine}>
                <span className={styles.nickName}>{name}</span>
                <span className={styles.answerTime}>{QuestionDate(question.answer.createdAt)}</span>
              </div>
              <p className={`${styles.answerContent} ${isRejected ? styles.rejected : ''}`}>
                {isRejected ? '답변 거절' : question.answer.content}
              </p>
            </div>
          </div>
        )}

        <hr />

<<<<<<< HEAD
        <div className={styles.reactionContainer}>
          <button
            type="button"
            onClick={handleLike}
            disabled={saving}
            className={styles.reactionButton}
          >
            <ThumbsUp className={styles.icon} />
            좋아요 {likeCount}
          </button>

          <button
            type="button"
            onClick={handleDislike}
            disabled={saving}
            className={styles.reactionButton}
          >
            <ThumbsDown className={styles.icon} />
            싫어요 {dislikeCount}
          </button>
        </div>
=======
        <Reactions question={question} />
>>>>>>> fc8b0e183b8cf1c7c6ff7d05ecb2307542611f59
      </div>
    </div>
  );
}

export default React.memo(QuestionCard);
