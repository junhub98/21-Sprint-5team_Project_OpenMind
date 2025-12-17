import styled, { keyframes } from 'styled-components';
import media from '../utils/media';
import Skeleton from '../utils/skeleton';

//스켈레톤 base
const MySkeleton = styled(Skeleton)`
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
        <MySkeleton $w="60px" $h="60px" $r="50%" $mobile />
        <MySkeleton $w="120px" $h="20px" />
      </Column>

      <Row>
        <MySkeleton $w="56px" $h="16px" />
        <MySkeleton $w="32px" $h="16px" />
      </Row>
    </CardSkeleton>
  );
}
