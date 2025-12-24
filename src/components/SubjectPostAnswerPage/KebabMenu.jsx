import { useState } from 'react';
import styled from 'styled-components';
import KebabIcon from '../../assets/SubjectPostAnswerPage/Kebab.png';


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
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 10;
`;

const MenuItem = styled.li`
  padding: 6px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function KebabMenu({ onEdit, onDelete, onReject }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuWrapper>
      <MenuButton onClick={() => setIsOpen(prev => !prev)}>
        <img src={KebabIcon} alt="메뉴" />
      </MenuButton>

      {isOpen && (
        <MenuList>
          <MenuItem onClick={onEdit}>수정</MenuItem>
          <MenuItem onClick={onDelete}>삭제</MenuItem>
          <MenuItem onClick={onReject}>거절</MenuItem>
        </MenuList>
      )}
    </MenuWrapper>
  );
}

export default KebabMenu;