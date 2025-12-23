import styled from 'styled-components';
import { useState } from 'react';

const ToggleBox = styled.button`
  width: 40px;
  height: 16px;
  position: relative;
  border: 1px solid var(--gray-40);
  border-radius: 10px;
  background-color: ${({ $active }) => ($active ? `var(--brown-20)` : `var(--gray-20)`)};
  cursor: 'pointer';
`;
const ToggleBall = styled.div`
  position: absolute;
  left: -2px;
  top: -4.3px;
  width: 24px;
  height: 24px;
  border-radius: 15px;

  background-color: ${({ $active }) => ($active ? `var(--brown-30)` : `var(--gray-30)`)};
  transition: 0.3s ease-in-out;
  transform: ${({ $active }) => ($active ? `translateX(20px)` : `translateX(0)`)};
`;

/**
 * Toggle 컴포넌트
 *
 * 내부 상태(isOn)를 기반으로 토글 UI를 렌더링하고,
 * 클릭 시 토글 상태를 반전시킨다.
 *
 * @param {Object} props
 * @param {(updater: (prev: boolean) => !boolean) => void} props.callback
 *  - 부모 컴포넌트의 상태를 토글하기 위한 콜백 함수
 *  - 내부 토글 상태 변경과 동시에 호출되며
 *    이전 상태(prev)를 받아 새로운 boolean 값을 반환해야 함
 *
 * @example
 * const [enabled, setEnabled] = useState(false);
 *
 * <Toggle callback={setEnabled} />
 */

export default function Toggle({ callback, isScrollMode }) {
  const [isOn, setIsOn] = useState(false);

  return (
    <ToggleBox
      $active={isScrollMode}
      onClick={() => {
        setIsOn((prev) => !prev);
        callback((prev) => !prev);
      }}
    >
      <ToggleBall $active={isScrollMode} />
    </ToggleBox>
  );
}
