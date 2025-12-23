import styled from 'styled-components';
import logoImg from '../../assets/SubjectsListPage/logo.png';
import arrowRight from '../../assets/SubjectsListPage/arrow-right.png';
import media from '../../utils/media';
import { memo } from 'react';
import SettingMenu from './SettingMenu';
import { Link } from 'react-router-dom';

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

const LogoImg = styled.img``;

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

  &:hover {
    background-color: var(--brown-15);
    border: 1px solid var(--brown-50);
  }
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

const SubjectsListPageNav = memo(function SubjectsListPageNav({
  setIsScrollMode,
  setScrollPage,
  setScrollPageParams,
  isScrollMode,
}) {
  return (
    <Header>
      <Link to="/">
        <LogoImg src={logoImg} />
      </Link>
      <Button>
        답변하러가기
        <Arrow src={arrowRight} />
      </Button>
      <SettingMenu
        setIsScrollMode={setIsScrollMode}
        setScrollPage={setScrollPage}
        setScrollPageParams={setScrollPageParams}
        isScrollMode={isScrollMode}
      />
    </Header>
  );
});

export default SubjectsListPageNav;
