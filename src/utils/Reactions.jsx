import styles from './Reactions.module.scss';
import { useState, useEffect } from 'react';
import ThumbsUp from '../assets/PersonalImages/thumbsUp.svg?react';
import ThumbsDown from '../assets/PersonalImages/thumbsDown.svg?react';
import { dislikeQuestion, likeQuestion } from './getDataApi';

export default function Reactions({ question }) {
  const [saving, setSaving] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(question.like || 0);
  const [dislikeCount, setDislikeCount] = useState(question.dislike || 0);

  const storageKey = `reaction-${question.id}`;

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
    if (disliked || liked) {
      alert('리액션은 변경할 수 없습니다.');
      return;
    }

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
    if (disliked || liked) {
      alert('리액션은 변경할 수 없습니다.');
      return;
    }

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
  );
}
