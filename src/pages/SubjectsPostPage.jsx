import ProfileHeader from '../components/SubjectPostAnswerPage/ProfileHeader';
import QuestionSection from '../components/SubjectPostAnswerPage/QuestionSection';
import { useEffect, useState} from 'react';

function SubjectPostAnswerPage() {
  const [subjectId, setSubjectId] = useState(1); // 기본값 1
  const [userId, setUserId] = useState(1);       // 테스트용 userId

  // localStorage에서 subjectId 읽기
  useEffect(() => {
    const storedId = localStorage.getItem('subjectId');
    if (storedId) {
      setSubjectId(Number(storedId));
    }
  }, []);

  return (
    <>
      <ProfileHeader userId={userId} />
      <QuestionSection subjectId={subjectId} />
    </>
  );
}

export default SubjectPostAnswerPage;