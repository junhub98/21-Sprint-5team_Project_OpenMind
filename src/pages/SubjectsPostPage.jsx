import ProfileHeader from '../components/SubjectPostAnswerPage/ProfileHeader';
import QuestionSection from '../components/SubjectPostAnswerPage/QuestionSection';
import { useEffect, useState} from 'react';

function SubjectPostAnswerPage() {
  const [subjectId, setSubjectId] = useState(null); 
  const [userId, setUserId] = useState(null);       

  // localStorage에서 subjectId 읽기
  useEffect(() => {
    const storedSubjectId = localStorage.getItem('subjectId');
    const storedUserId = localStorage.getItem('userId');
    if (storedSubjectId) setSubjectId(Number(storedSubjectId));
    if (storedUserId) setUserId(Number(storedUserId));
  }, []);

  // 로그인 없이 막기
  // if (!userId) 
  //   return <div>로그인 후 확인 가능합니다.</div>; 

  return (
    <>
      <ProfileHeader userId={userId} />
      <QuestionSection subjectId={subjectId} />
    </>
  );
}

export default SubjectPostAnswerPage;