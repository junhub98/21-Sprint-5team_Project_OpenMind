import ProfileHeader from '../components/SubjectPostAnswerPage/ProfileHeader';
import QuestionSection from '../components/SubjectPostAnswerPage/QuestionSection';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    overflow-y: scroll;
  }
`;

function SubjectPostAnswerPage() {
  const subjectId = localStorage.getItem('subjectId');

  // subjectId 준비 전에는 렌더링 하지 않음
  if (subjectId === null) {
    return <div>로딩 중...</div>;
  }

  // 질문 받기로 생성한 id가 로컬 스토리지에 없으면 메인페이지 이동
  // if (!subjectId)
  //   return <div>로그인 후 확인 가능합니다.</div>;

  return (
    <>
      <GlobalStyle />
      <ProfileHeader subjectId={subjectId} />
      <QuestionSection subjectId={subjectId} />
    </>
  );
}

export default SubjectPostAnswerPage;
