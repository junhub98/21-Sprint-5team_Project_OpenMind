
import { css } from 'styled-components';

const media = {
  tabletBig: (...args) => css`
    @media (max-width: 1200px) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: 950px) {
      ${css(...args)}
    }
  `,
  mobile: (...args) => css`
    @media (max-width: 768px) {
      ${css(...args)}
    }
  `,
  sixCardsList: (...args) => css`
    @media (max-width: 863px) {
      ${css(...args)}
    }
  `,
};

export default media;
