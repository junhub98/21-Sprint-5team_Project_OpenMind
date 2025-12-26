import styles from './QuestionCard.module.css';
import React, { useState } from 'react';
import profileImage from '../assets/profileImage.svg';
import ThumbsUp from '../assets/thumbsUp.svg?react';
import ThumbsDown from '../assets/thumbsDown.svg?react';

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
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(question.like || 0);
  const [dislikeCount, setDislikeCount] = useState(question.dislike || 0);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
      return;
    }

    setLiked(true);
    setLikeCount((prev) => prev + 1);

    if (disliked) {
      setDisliked(false);
      setDislikeCount((prev) => prev - 1);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikeCount((prev) => prev - 1);
      return;
    }

    setDisliked(true);
    setDislikeCount((prev) => prev + 1);

    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
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

        <div className={styles.answerItems}>
          <img className={styles.profileImage} src={profileImage} alt="profile" />

          <div className={styles.questionLabel}>
            <div className={styles.metaLine}>
              <span className={styles.nickName}>{subjectName}</span>

              {isAnswered && (
                <span className={styles.answerTime}>{QuestionDate(question.answer.createdAt)}</span>
              )}
            </div>

            {isAnswered && <p className={styles.answerContent}>{question.answer.content}</p>}
          </div>
        </div>

        <hr />

        <div className={styles.reactionContainer}>
          <button
            type="button"
            onClick={handleLike}
            className={`${styles.reactionButton} ${liked ? styles.likeActive : ''}`}
          >
            <ThumbsUp className={styles.icon} />
            좋아요 {likeCount}
          </button>

          <button
            type="button"
            onClick={handleDislike}
            className={`${styles.reactionButton} ${disliked ? styles.dislikeActive : ''}`}
          >
            <ThumbsDown className={styles.icon} />
            싫어요 {dislikeCount}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(QuestionCard);
