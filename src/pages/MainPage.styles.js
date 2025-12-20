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
  background-size: 1200px auto;
  background-position: center bottom;
  background-repeat: no-repeat;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

  ${media.tablet`
    background-size: 900px auto;
  `}

  ${media.mobile`
    background-size: 520px auto;
  `}
`;

export const Content = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 0 16px;

  ${media.tablet`
    gap: 20px;
  `}

  ${media.mobile`
    gap: 12px;
  `}
`;


