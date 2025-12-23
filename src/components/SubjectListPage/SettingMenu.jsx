import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import settingIc from '../../assets/SubjectsListPage/setting.png';
import Toggle from '../../utils/Toggle';
import media from '../../utils/media';

const SettingImg = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 53px;
  right: 320px;
  cursor: pointer;

  ${media.tabletBig`
    right: 240px;
  `}

  ${media.mobile`
    right: 20px;
    top: 25px;
  `}
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

  ${media.tabletBig`
    right: 293px;
  `}

  ${media.mobile`
    width: 90px;
    right: 20px;
    top: 70px;
  `}
`;

const SettingOption = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px 0 25px;
  gap: 0 20px;

  height: 46px;
  ${media.mobile`
    flex-direction: column;
    justify-content: space-evenly;
    right: 20px;
    top: 70px;
    padding: 0 0;
  `}
`;

export default function SettingMenu({
  setIsScrollMode,
  isScrollMode,
  setScrollPage,
  setScrollPageParams,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const settingBoxRef = useRef(null);
  const settingImgRef = useRef(null);

  const handleClick = () => {
    setIsScrollMode((prev) => !prev);
    setScrollPage(1);
    setScrollPageParams([]);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e) => {
      if (
        !settingBoxRef?.current.contains(e.target) &&
        !settingImgRef?.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <>
      <SettingImg
        ref={settingImgRef}
        onClick={() => setIsOpen((prev) => !prev)}
        src={settingIc}
        alt="환경설정 이미지"
      />
      {isOpen && (
        <SettingBox ref={settingBoxRef}>
          <ul>
            <SettingOption>
              Scroll 모드
              <Toggle isScrollMode={isScrollMode} callback={handleClick} />
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
