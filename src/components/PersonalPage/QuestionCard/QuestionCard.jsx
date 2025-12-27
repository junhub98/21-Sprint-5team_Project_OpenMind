import React, { useEffect, useState } from 'react';
import styles from './QuestionCard.module.css';
import profileImage from '../../../assets/PersonalImages/profileImage.svg';
import ThumbsUp from '../../../assets/PersonalImages/thumbsUp.svg?react';
import ThumbsDown from '../../../assets/PersonalImages/thumbsDown.svg?react';
import { likeQuestion, dislikeQuestion } from '../../../utils/getDataApi';

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

  const storageKey = `reaction-${question.id}`;

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(question.like || 0);
  const [dislikeCount, setDislikeCount] = useState(question.dislike || 0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'like') {
      setLiked(true);
    }
    if (saved === 'dislike') {
      setDisliked(true);
    }
  }, [storageKey]);

  const handleLike = async () => {
    if (saving) return;
    if (liked) return;

    setSaving(true);
    setLiked(true);
    setLikeCount(likeCount + 1);

    if (disliked) {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
    }

    try {
      await likeQuestion(question.id);
      localStorage.setItem(storageKey, 'like');
    } catch (e) {
      setLiked(false);
      setLikeCount(likeCount);
    } finally {
      setSaving(false);
    }
  };

  const handleDislike = async () => {
    if (saving) return;
    if (disliked) return;

    setSaving(true);
    setDisliked(true);
    setDislikeCount(dislikeCount + 1);

    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    }

    try {
      await dislikeQuestion(question.id);
      localStorage.setItem(storageKey, 'dislike');
    } catch (e) {
      setDisliked(false);
      setDislikeCount(dislikeCount);
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
            <img className={styles.profileImage} src={profileImage} alt="profile" />
            <div className={styles.questionLabel}>
              <div className={styles.metaLine}>
                <span className={styles.nickName}>{subjectName}</span>
                <span className={styles.answerTime}>{QuestionDate(question.answer.createdAt)}</span>
              </div>
              <p className={`${styles.answerContent} ${isRejected ? styles.rejected : ''}`}>
                {isRejected ? '답변 거절' : question.answer.content}
              </p>
            </div>
          </div>
        )}

        <hr />

        <div className={styles.reactionContainer}>
          <button
            type="button"
            onClick={handleLike}
            disabled={saving}
            className={`${styles.reactionButton} ${liked ? styles.likeActive : ''}`}
          >
            <ThumbsUp className={styles.icon} />
            좋아요 {likeCount}
          </button>

          <button
            type="button"
            onClick={handleDislike}
            disabled={saving}
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
