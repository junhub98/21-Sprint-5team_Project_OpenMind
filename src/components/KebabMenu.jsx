import { useState } from 'react';
import kebabIcon from '../assets/Kebab.png';
import './KebabMenu.scss';

function KebabMenu({ onEdit, onDelete, onReject }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="kebab">
      <button
        className="kebab-button"
        onClick={() => setOpen(prev => !prev)}
        type="button"
      >
        <img src={kebabIcon} alt="케밥 아이콘" />
      </button>

      {open && (
        <ul className="kebab-menu">
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
        </ul>
      )}
    </div>
  );
}

export default KebabMenu;