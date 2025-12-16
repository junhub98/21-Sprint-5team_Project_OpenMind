import styled from 'styled-components';
import logoImg from '../assets/QuestionsListPage/logo.png';
import arrowRight from '../assets/QuestionsListPage/arrow-right.png';

const Header = styled.div`
  width: 100%;
  height: 136px;
  padding: 0 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  position: relative;
  width: 161px;
  height: 46px;
  background-color: var(--brown-10);
  border: 1px solid var(--brown-40);
  border-radius: 8px;
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--brown-40);
  padding: 1px 25px 0 0;
`;

const Arrow = styled.img`
  position: absolute;
  top: 14px;
  right: 23px;
`;

export default function SubjectsListPageNav() {
  return (
    <Header>
      <img src={logoImg} />
      <Button>
        답변하러가기
        <Arrow src={arrowRight} />
      </Button>
    </Header>
  );
}
