import styled from 'styled-components';
import messagesIC from '../assets/QuestionsListPage/Messages.png';
import media from '../utils/media';

const Card = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid var(--gray-40);
  border-radius: 16px;
  background-color: var(--gray-10);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  ${media.mobile`
    padding: 16px;
  `}
`;

const UserBox = styled.div`
  width: 100%;
  height: 97px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-family: 'pretendard';
  font-size: 20px;
  font-weight: 400;
  color: var(--gray-60);

  ${media.mobile`
    font-size: 18px;
  `}
`;

const UserImg = styled.img`
  width: 60px;
  height: 60px;
  border: 1px solid #d9d9d9;
  border-radius: 30px;

  ${media.mobile`
    width: 48px;
    height: 48px;
  `}
`;

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-40);

  ${media.mobile`
    font-size: 14px;
  `}
`;

const FlexDiv = styled(InfoBox)`
  width: 82px;
  height: 22px;

  ${media.mobile`
    width: 72px;
    height: 18px;
  `}
`;

const QuestionImg = styled.img`
  ${media.mobile`
    width: 16px;
    height: 16px;
  `}
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
          <QuestionImg src={messagesIC} />
          받은 질문
        </FlexDiv>
        {subject.questionCount}개
      </InfoBox>
    </Card>
  );
}
