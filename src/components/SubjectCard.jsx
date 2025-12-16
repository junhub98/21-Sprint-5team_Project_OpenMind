import { startTransition } from 'react';
import styled from 'styled-components';
import messagesIC from '../assets/QuestionsListPage/Messages.png';

const Card = styled.div`
  width: 220px;
  height: 187px;
  border: 1px solid var(--gray-40);
  border-radius: 16px;
  background-color: var(--gray-10);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const UserBox = styled.div`
  width: 180px;
  height: 97px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-family: 'pretendard';
  font-size: 20px;
  font-weight: 400;
  color: var(--gray-60);
`;

const UserImg = styled.img`
  width: 60px;
  height: 60px;
  border: 1px solid #d9d9d9;
  border-radius: 30px;
`;

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const FlexDiv = styled(InfoBox)`
  width: 82px;
  height: 22px;
`;
export default function SubjectCard({ subject }) {
  return (
    <Card>
      <UserBox>
        <UserImg src={subject.imageSource} />
        {subject.name}
      </UserBox>

      <InfoBox>
        <FlexDiv>
          <img src={messagesIC} />
          받은 질문
        </FlexDiv>
        {subject.questionCount}개
      </InfoBox>
    </Card>
  );
}
