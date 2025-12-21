import { useState } from 'react';
import styled from 'styled-components';
import settingIc from '../../assets/SubjectsListPage/setting.png';
import usePaginationParam from '../../hooks/usePaginationParam';

const Button = styled.button`
  width: 40px;
  height: 20px;
  background-color: ${({ $isOn }) => ($isOn ? 'green' : 'gray')};
  color: 'white';
  padding: '8px 16px';
  border: 'none';
  border-radius: '20px';
  cursor: 'pointer';
  position: absolute;
  top: 10px;
  right: 0;
`;

const SettingImg = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 53px;
  right: 320px;
  cursor: pointer;
`;

const SettingBox = styled.div`
  position: absolute;
  top: 45px;
  right: 373px;
  width: 150px;
  height: 100px;
  background-color: var(--gray-10);
  border: 1px solid var(--gray-50);
  border-radius: 16px;
`;

export default function SettingMenu({
  setIsScrollMode,
  isScrollMode,
  setScrollPage,
  setScrollPageParams,
}) {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsScrollMode((prev) => !prev);
    setScrollPage(1);
    setScrollPageParams([]);
  };

  return (
    <>
      <SettingImg onClick={() => setIsOn((prev) => !prev)} src={settingIc} />
      {isOn && (
        <SettingBox>
          SCROLL모드
          <Button onClick={handleClick} $isOn={isScrollMode}>
            {isScrollMode ? 'ON' : 'OFF'}
          </Button>
        </SettingBox>
      )}
    </>
  );
}
