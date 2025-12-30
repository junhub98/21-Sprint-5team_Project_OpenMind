import styled, { keyframes } from 'styled-components';

//스켈레톤 에니메이션
const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

//스켈레톤 base
const Skeleton = styled.div`
  width: ${({ $w }) => $w || '100%'};
  height: ${({ $h }) => $h || '16px'};
  border-radius: ${({ $r }) => $r || '8px'};
  background: linear-gradient(90deg, var(--gray-20) 25%, var(--brown-10) 37%, var(--gray-20) 63%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

export default Skeleton;
