import styled from 'styled-components';
import media from '../../media';

export const LogoBox = styled.div`
  padding: 16px;
`;

export const LogoImage = styled.img`
  display: block;
  width: 456px;
  height: auto;



  ${media.mobile`
    width: 248px;
  `}
`;


