import styled, { keyframes } from 'styled-components';
import messagesIC from '../../assets/SubjectsListPage/Messages.png';
import media from '../../utils/media';

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ    styled-components   ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//스켈레톤 에니메이션
const pop = keyframes`
  0% { position: absolute; }

  100% { position: absolute;  }
`;

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
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (hover: hover) {
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
      border: 1.5px solid var(--brown-40);
    }
  }
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
  position: relative;

  ${media.mobile`
    font-size: 18px;
    height: 84px;
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

const Row = styled(InfoBox)`
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

const UserTag = styled.span`
  height: 20;
  border: none;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 15px;
  background-color: var(--brown-20);
  position: absolute;
  top: 3px;
  right: 0px;
`;

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ    react component   ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

export default function SubjectCard({ subject }) {
  const userName = subject?.name?.split('#tag:')[0];
  const userTag = subject?.name?.split('#tag:')[1];
  return (
    <Card>
      <UserBox>
        {userTag && <UserTag>#{userTag}</UserTag>}
        <UserImg src={subject.imageSource} />
        {userName}
      </UserBox>

      <InfoBox>
        <Row>
          <QuestionImg src={messagesIC} />
          받은 질문
        </Row>
        {subject.questionCount}개
      </InfoBox>
    </Card>
  );
}
