import { useState } from 'react';
import styles from './CustomSelect.module.scss';
import styled from 'styled-components';
import arrowDownIC from '../assets/QuestionsListPage/arrow-down.png';
import arrowUpIC from '../assets/QuestionsListPage/arrow-up.png';
import useSortParam from '../hooks/useSortParam';

const Li = styled.li`
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

const ArrowDown = styled.img`
  position: absolute;
  right: 11px;
  top: 32%;
  pointer-events: none;
`;
const ArrowUp = styled(ArrowDown)``;

export default function CustomSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const { orderBy, setOrderBy } = useSortParam();

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
  return (
    <div className={styles.positionBox}>
      <div className={styles.positionBox}>
        <button
          className={`${styles.sortOptions} ${isOpen ? styles.active : ''}`} // 버튼 오픈 시 active
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {sortOptions.map((option) => option.value == orderBy && option.name)}
        </button>
        {isOpen ? <ArrowUp src={arrowUpIC} /> : <ArrowDown src={arrowDownIC} />}
      </div>

      {isOpen && (
        <ul>
          {sortOptions.map((option, index) => (
            <Li
              $firstOption={index == 0}
              $lastOption={index == sortOptions.length - 1}
              key={option.value}
              onClick={() => {
                setOrderBy(option.value);
                setIsOpen(false);
              }}
            >
              {option.name}
            </Li>
          ))}
        </ul>
      )}
    </div>
  );
}
