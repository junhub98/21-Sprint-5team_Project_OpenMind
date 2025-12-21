import styled, { keyframes } from 'styled-components';

const OnLoadingButton = styled.button`
  display: flex;
  justify-content: center;
  gap: 0 10px;
  align-items: center;
  width: 100%;
  height: 100px;
  margin-top: 15px;
  padding: 1px 0 0 0;
  border: none;
  border-radius: 13px;
  background-color: var(--gray-20);
  font-family: 'pretendard';
  font-size: 18px;
  font-weight: 400;
  color: var(--gray-50);
  position: relative;

  cursor: default;
`;

const spin = keyframes`
  to {
    transform:  rotate(360deg);
  }
`;

const Spinner = styled.span`
  position: absolute;
  top: 31%;
  left: 54%;
  width: 23px;
  height: 23px;
  border-radius: 50%;

  background: conic-gradient(
    from 0deg,
    var(--gray-10),
    var(--brown-30),
    var(--brown-20),
    var(--gray-10)
  );

  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0);

  animation: ${spin} 0.8s linear infinite;
`;

export default function LoadingBar({ ref }) {
  return (
    <OnLoadingButton ref={ref}>
      Loading....
      <Spinner />
    </OnLoadingButton>
  );
}
