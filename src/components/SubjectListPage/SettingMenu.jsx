import { useState } from 'react';
import styled from 'styled-components';
import settingIc from '../../assets/SubjectsListPage/setting.png';
import Toggle from '../../utils/Toggle';

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
  display: flex;
  flex-direction: column;

  top: 45px;
  right: 373px;
  width: 200px;
  font-family: 'pretendard';
  font-size: 15px;
  font-weight: 700;
  color: var(--gray-50);

  background-color: var(--gray-10);
  border: 1px solid var(--gray-50);
  border-radius: 16px;
`;

const SettingOption = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px 0 25px;
  gap: 0 20px;
  height: 46px;
`;

export default function SettingMenu({
  setIsScrollMode,

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
          <ul>
            <SettingOption>
              Scroll 모드
              <Toggle callback={handleClick} />
            </SettingOption>
            <SettingOption>
              Dark 모드
              <Toggle callback={() => {}} />
            </SettingOption>
          </ul>
        </SettingBox>
      )}
    </>
  );
}
