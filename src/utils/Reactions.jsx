import styles from './Reactions.module.scss';
import { useState } from 'react';
import ThumbsUp from '../assets/PersonalImages/thumbsUp.svg?react';
import ThumbsDown from '../assets/PersonalImages/thumbsDown.svg?react';
import { dislikeQuestion, likeQuestion } from './getDataApi';

export default function Reactions({ question }) {
  const [saving, setSaving] = useState(false);
  const [likeCount, setLikeCount] = useState(question.like || 0);
  const [dislikeCount, setDislikeCount] = useState(question.dislike || 0);

  const [likeShake, setLikeShake] = useState(false);
  const [dislikeShake, setDislikeShake] = useState(false);

  const handleLike = async () => {
    if (saving) return;

    setLikeShake(true);
    setTimeout(() => setLikeShake(false), 200);

    setSaving(true);
    setLikeCount((prev) => prev + 1);

    try {
      await likeQuestion(question.id);
    } catch {
      setLikeCount((prev) => Math.max(0, prev - 1));
    } finally {
      setSaving(false);
    }
  };

  const handleDislike = async () => {
    if (saving) return;

    setDislikeShake(true);
    setTimeout(() => setDislikeShake(false), 200);

    setSaving(true);
    setDislikeCount((prev) => prev + 1);

    try {
      await dislikeQuestion(question.id);
    } catch {
      setDislikeCount((prev) => Math.max(0, prev - 1));
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
        className={styles.reactionButton}
      >
        <span
          className={`${styles.content} ${likeShake ? styles.shake : ''} ${
            likeShake ? styles.likeActive : ''
          }`}
        >
          <ThumbsUp className={styles.icon} />
          좋아요 {likeCount}
        </span>
      </button>

      <button
        type="button"
        onClick={handleDislike}
        disabled={saving}
        className={styles.reactionButton}
      >
        <span
          className={`${styles.content} ${dislikeShake ? styles.shake : ''} ${
            dislikeShake ? styles.dislikeActive : ''
          }`}
        >
          <ThumbsDown className={styles.icon} />
          싫어요 {dislikeCount}
        </span>
      </button>
    </div>
  );
}
