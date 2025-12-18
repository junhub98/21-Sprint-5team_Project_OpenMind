import styled from 'styled-components';
import media from '../../media';

export const Header = styled.header`
  /* PC/태블릿: 화면 우상단 고정(콘텐츠 정렬에 영향 X) */
  position: absolute;
  top: 24px;
  right: 48px;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  padding: 0;

  ${media.tablet`
    top: 16px;
    right: 20px;
  `}

  ${media.mobile`
    /* 모바일: 로고와 폼 사이(콘텐츠 흐름 안)로 들어오게 */
    position: static;
    top: auto;
    right: auto;
    z-index: auto;
    width: 100%;
    justify-content: center;
  `}
`;

export const GoQuestionsButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid #b88a5a;
  background-color: #fff7f0;
  color: #7a4a1b;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  ${media.tablet`
    padding: 10px 16px;
    font-size: 14px;
  `}

  ${media.mobile`
    padding: 8px 12px;
    font-size: 13px;
  `}
`;


