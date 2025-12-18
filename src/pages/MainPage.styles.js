import styled from 'styled-components';
import media from '../media';
import BackgroundImage from '../assets/Images/Image2.png';

export const Page = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-image: url(${BackgroundImage});
  background-size: clamp(520px, 90vw, 1200px) auto;
  background-position: center bottom;
  background-repeat: no-repeat;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

  ${media.tablet`
    background-size: clamp(420px, 110vw, 900px) auto;
  `}

  ${media.mobile`
    background-size: clamp(320px, 130vw, 520px) auto;
  `}
`;

export const Content = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(12px, 3.5vh, 28px);
  padding: 0 16px;
`;


