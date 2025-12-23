import { useState } from 'react';
import styled from 'styled-components';
import kebabIcon from '../../assets/SubjectPostAnswerPage/Kebab.png';

const Kebab = styled.div`
  position: relative;
`;

const KebabButton = styled.button`
  background: none;     
  border: none;         
  padding: 0;           
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    width: 20px;        
    height: 20px;
    display: block;
  }
`;

const KebabMenuStyle = styled.ul`
  position: absolute;
  top: 28px;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 4px 0;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);

   li {
    padding: 8px 12px;   
    cursor: pointer;
    font-size: 14px;
    color: #000;
    text-align: left;     
    white-space: nowrap;  

    &:hover {
      background-color: #f7f2ed; 
    }
  }
`;


function KebabMenu({ onEdit, onDelete, onReject }) {
  const [open, setOpen] = useState(false);

  return (
    <Kebab>
      <KebabButton
        onClick={() => setOpen(prev => !prev)}
        type="button"
      >
        <img src={kebabIcon} alt="케밥 아이콘" />
      </KebabButton>

      {open && (
        <KebabMenuStyle>
          <li
            onClick={(e) => {
              e.preventDefault();
              onEdit();
              setOpen(false);
            }}
          >
            수정하기
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              onDelete();
              setOpen(false);
            }}
          >
            삭제하기
          </li>
          <li 
            onClick={(e) => {
              e.preventDefault();
              onReject();
              setOpen(false);
            }}
          >
            거절하기
          </li>
        </KebabMenuStyle>
      )}
    </ Kebab>
  );
}

export default KebabMenu;