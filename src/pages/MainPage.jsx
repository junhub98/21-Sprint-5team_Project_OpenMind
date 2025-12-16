import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenMindImage from '../assets/Images/logo.png';
import PersonImage from '../assets/Images/Person.png';
import styles from './MainPage.module.css';

export default function MainPage() {
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleGoToQuestions = () => {
    navigate('/post');
  };

  const handleCreateFeed = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert('이름을 입력해 주세요.');
      return;
    }

    try {
      setIsCreating(true);

      const feedId = 'temporary-id';

      navigate(`/post/${feedId}/answer`);
    } catch (error) {
      console.error(error);
      alert('피드 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          onClick={handleGoToQuestions}
          className={styles.goQuestionsButton}
        >
          질문하러 가기 →
        </button>
      </header>

      <section className={styles.content}>
        <div className={styles.logoBox}>
          <img
            src={OpenMindImage}
            alt="OpenMind 로고"
            className={styles.logoImage}
          />
        </div>

        <form onSubmit={handleCreateFeed} className={styles.form}>
          <div className={styles.inputWrapper}>
            <img
              src={PersonImage}
              alt="이름 입력 아이콘"
              className={styles.inputIcon}
            />
            <input
              id="name"
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className={`${styles.submitButton} ${
              isCreating ? styles.submitButtonDisabled : ''
            }`}
          >
            {isCreating ? '생성 중...' : '질문 받기'}
          </button>
        </form>
      </section>
    </main>
  );
}

