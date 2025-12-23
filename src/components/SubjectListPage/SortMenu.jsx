import { useState, useRef, useEffect } from 'react';
import styles from './SortMenu.module.scss';
import styled from 'styled-components';
import arrowDownIC from '../../assets/SubjectsListPage/arrow-down.png';
import arrowUpIC from '../../assets/SubjectsListPage/arrow-up.png';
import useSortParam from '../../hooks/useSortParam';
import { memo } from 'react';

const SortOption = styled.li`
  width: 79px;
  height: 34px;
  font-family: 'pretendard';
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-50);
  border: 1px solid var(--gray-30);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  //첫번째 옵션 과 마지막 옵션에 border-radius 지정
  border-radius: ${({ $firstOption, $lastOption }) =>
    $firstOption ? '8px 8px 0 0' : $lastOption ? '0 0 8px 8px' : '0 0 0 0'};

  &:hover {
    color: var(--blue-50);
  }
`;

const SortOptions = styled.ul`
  position: absolute;
  background-color: #ffffff;
  border-radius: 12px;
  top: 38px;
  z-index: 40;
`;

const ArrowDown = styled.img`
  position: absolute;
  right: 11px;
  top: 32%;
  pointer-events: none;
`;
const ArrowUp = styled(ArrowDown)``;

export default function SortMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { orderBy, setOrderBy } = useSortParam();
  const sortMenu = useRef(null);

  const sortOptions = [
    {
      name: '이름순',
      value: 'name',
    },

    {
      name: '최신순',
      value: 'time',
    },
  ];

  //sortMenu 외부 클릭시 닫힘
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e) => {
      if (!sortMenu?.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isOpen]);

  const handleOptionClick = (value) => {
    if (orderBy == value) return;
    setOrderBy(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.positionBox} ref={sortMenu}>
      <div className={styles.positionBox}>
        <button
          className={`${styles.sortOptions} ${isOpen ? styles.active : ''}`} // 버튼 오픈 시 active
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {sortOptions.map((option) => option.value == orderBy && option.name)}
        </button>
        {isOpen ? (
          <ArrowUp src={arrowUpIC} alt="화살표 위로 향한 이미지" />
        ) : (
          <ArrowDown src={arrowDownIC} alt="화살표 아래로 향한 이미지" />
        )}
      </div>

      {isOpen && (
        <SortOptions>
          {sortOptions.map((option, index) => (
            <SortOption
              $firstOption={index == 0}
              $lastOption={index == sortOptions.length - 1}
              key={option.value}
              onClick={() => {
                handleOptionClick(option.value);
              }}
            >
              {option.name}
            </SortOption>
          ))}
        </SortOptions>
      )}
    </div>
  );
}
