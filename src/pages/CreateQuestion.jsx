import FeedHeader from '../components/FeedHeader';
import CreateQuestionButton from '../components/CreateQuestionButton';
import CreateQuestionCard from '../components/CreateQuestionCard';
import styles from './CreateQuestion.module.css';

export default function CreateQuestion() {
  return (
    <div className={styles.createQuestionPage}>
      <FeedHeader />
      <CreateQuestionCard />
      <CreateQuestionButton />
    </div>
  );
}
