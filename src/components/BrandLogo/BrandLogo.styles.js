import styled from 'styled-components';
import media from '../../media';

export const LogoBox = styled.div`
  padding: 16px;
`;

export const LogoImage = styled.img`
  display: block;
  width: 456px;
  height: auto;

  ${media.tablet`
    width: 380px;
  `}

  ${media.mobile`
    width: 220px;
  `}
`;


