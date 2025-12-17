import styled, { keyframes } from 'styled-components';
import media from '../utils/media';

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

  ${({ $mobile }) =>
    $mobile &&
    media.mobile`
      width: 48px;
      height: 48px;
    `}
`;

const CardSkeleton = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid var(--gray-40);
  border-radius: 16px;
  background-color: var(--gray-10);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  ${media.mobile`
    padding: 16px;
  `}
  pointer-events: none;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function SubjectLoadingCard() {
  return (
    <CardSkeleton>
      <Column>
        <Skeleton $w="60px" $h="60px" $r="50%" $mobile />
        <Skeleton $w="120px" $h="20px" />
      </Column>

      <Row>
        <Skeleton $w="56px" $h="16px" />
        <Skeleton $w="32px" $h="16px" />
      </Row>
    </CardSkeleton>
  );
}
