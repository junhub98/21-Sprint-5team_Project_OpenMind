import { useState, useRef, useEffect } from 'react';
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
  flex-direction: row;
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

// 메인 컴포넌트 
function KebabMenu({ onEdit, onDelete, onReject }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // 토글
  const handleToggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  // 외부 클릭시 케밥 닫기
  useEffect(() => {
    if(!isOpen) return;

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleEditClick = () => {
    onEdit();
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete();
    setIsOpen(false);
  };

  const handleRejectClick = () => {
    if (!onReject) return;
    onReject();
    setIsOpen(false);
  };

  return (
    <MenuWrapper>
      <MenuButton onClick={handleToggleMenu}>
        <img src={KebabIcon} alt="메뉴" />
      </MenuButton>

      {isOpen && (
        <MenuList>
          <MenuItem onClick={handleEditClick}>수정하기</MenuItem>
          <MenuItem onClick={handleDeleteClick}>삭제하기 </MenuItem>
          {onReject && (
            <MenuItem onClick={handleRejectClick}>거절하기</MenuItem>
          )}
            
        </MenuList>
      )}
    </MenuWrapper>
  );
}

export default KebabMenu;