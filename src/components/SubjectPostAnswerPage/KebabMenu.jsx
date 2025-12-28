import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import KebabIcon from '../../assets/SubjectPostAnswerPage/Kebab.png';
import { rejectAnswer } from '../../utils/getDataApi';

// styled-components
const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const MenuList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #e5d8cc;
  border-radius: 12px;

  gap: 4px;
  z-index: 10;
`;

const MenuItem = styled.li`
  padding: 6px 6px;
  width: 80px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

// 메인 컴포넌트
function KebabMenu({ setIsEdit, onDelete, question }) {
  const [isOpen, setIsOpen] = useState(false);

  const isRejected = question?.answer?.isRejected;

  // 토글
  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEditClick = () => {
    setIsEdit(true);
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete(question.id);
    setIsOpen(false);
  };

  const handleRejectClick = () => {
    rejectAnswer(question.id);
    setIsOpen(false);
  };

  return (
    <MenuWrapper>
      <MenuButton onClick={handleToggleMenu}>
        <img src={KebabIcon} alt="메뉴" />
      </MenuButton>

      {isOpen && (
        <MenuList>
          {question.answer && <MenuItem onClick={handleEditClick}>수정하기</MenuItem>}
          <MenuItem onClick={handleDeleteClick}>삭제하기 </MenuItem>
          {!isRejected && !question.answer && (
            <MenuItem onClick={handleRejectClick}>거절하기</MenuItem>
          )}
        </MenuList>
      )}
    </MenuWrapper>
  );
}

export default KebabMenu;
