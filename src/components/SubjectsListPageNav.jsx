import styled from 'styled-components';
import logoImg from '../assets/QuestionsListPage/logo.png';
import arrowRight from '../assets/QuestionsListPage/arrow-right.png';
import media from '../utils/media';

const Header = styled.div`
  width: 100%;
  height: 136px;
  padding: 0 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.tabletBig`
    padding: 0 50px;
  `}

  ${media.mobile`
    flex-direction: column;
    justify-content: flex-start;
    height: 203px;
    padding: 40px 0 0 0;
    gap: 20px 0;
  `}
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

  ${media.mobile`
    width: 127px;
    height: 34px;
    padding: 0 17px 0 0;
    font-size: 14px;
  `}
`;

const Arrow = styled.img`
  position: absolute;
  top: 14px;
  right: 23px;

  ${media.mobile`
    top: 7.5px;
    right: 9px;
  `}
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
