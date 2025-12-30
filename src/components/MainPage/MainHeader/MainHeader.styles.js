import styled from 'styled-components';
import media from '../../../utils/media';

export const Header = styled.header`
  /* PC/태블릿: 화면 우상단 고정(콘텐츠 정렬에 영향 X) */
  position: absolute;
  top: 45px;
  right: 130px;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 0;

  ${media.tablet`
    top: 44px;
  right: 47px;
  `}

  ${media.mobile`
    /* 모바일: 로고와 폼 사이(콘텐츠 흐름 안)로 들어오게 */
    position: static;
    top: auto;
    right: auto;
    z-index: auto;
    width: 320px;
    height: 42px;
    justify-content: center;
  `}
`;

export const GoQuestionsButton = styled.button`
  width: 161px;
  height: 46px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  border-radius: 8px;
  border: 1px solid var(--brown-40);
  background-color: var(--brown-10);
  color: var(--brown-40);
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;

  ${media.mobile`
  top: 0px;
   width: 123px;
  height: 34px;
    padding: 8px 12px;
    font-size: 14px;
  `}
`;

export const Arrow = styled.img`
  position: absolute;
  top: 14px;
  right: 23px;

  ${media.mobile`
    top: 7.5px;
    right: 9px;
  `}
`;
