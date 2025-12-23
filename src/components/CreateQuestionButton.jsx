import { useEffect, useState } from 'react';
import styles from './CreateQuestionButton.module.css';

export default function CreateQuestionButton({ onClick }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <button type="button" onClick={onClick} className={styles.createQuestionButton}>
      {isMobile ? '질문 작성' : '질문 작성하기'}
    </button>
  );
}
