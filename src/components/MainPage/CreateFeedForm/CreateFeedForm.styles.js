import styled from 'styled-components';
import media from '../../../utils/media';

export const Form = styled.form`
  width: 420px;
  padding: 28px 24px 32px;
  border-radius: 16px;
  background-color: var(--gray-10);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${media.tablet`
    width: 380px;
  `}

  ${media.mobile`
    width: 320px;
    padding: 22px 18px 24px;
    border-radius: 14px;
  `}
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const InputIcon = styled.img`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
`;

export const NameInput = styled.input`
  padding: 12px 16px;
  padding-left: 44px;
  padding-right: 80px;
  border-radius: 8px;
  border: 1px solid var(--brown-20);
  font-size: 14px;
  outline: none;
  width: 100%;

  ${media.mobile`
    font-size: 13px;
    padding-right: 70px;
  `}
`;

export const TagButtonWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
`;

export const TagButton = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid var(--brown-20);
  background-color: var(--gray-10);
  color: var(--brown-40);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--gray-20);
    border-color: var(--brown-40);
  }

  ${media.mobile`
    padding: 5px 10px;
    font-size: 11px;
  `}
`;

export const TagDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: var(--gray-10);
  border: 1px solid var(--brown-20);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
`;

export const TagList = styled.ul`
  list-style: none;
  padding: 8px 0;
  margin: 0;
`;

export const TagItem = styled.li`
  padding: 10px 16px;
  font-size: 14px;
  color: var(--gray-50);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--gray-20);
  }

  ${media.mobile`
    padding: 8px 14px;
    font-size: 13px;
  `}
`;

export const SelectedTag = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const TagContent = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: linear-gradient(135deg, var(--brown-10) 0%, var(--brown-15) 100%);
  border: 1px solid var(--brown-20);
  border-radius: 20px;
  font-family: 'pretendard', sans-serif;
  font-size: 13px;
  color: var(--brown-40);
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  ${media.mobile`
    padding: 6px 10px;
    font-size: 12px;
    gap: 6px;
  `}
`;

export const TagText = styled.span`
  display: inline-block;
  letter-spacing: 0.2px;
`;

export const RemoveButton = styled.button`
  background: rgba(154, 66, 42, 0.1);
  border: none;
  color: var(--brown-40);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: var(--brown-40);
    color: var(--gray-10);
    transform: rotate(90deg) scale(1.1);
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }

  ${media.mobile`
    width: 18px;
    height: 18px;
    font-size: 14px;
  `}
`;

export const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background-color: var(--brown-40);
  color: var(--gray-10);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    background-color: var(--brown-30);
    cursor: default;
  }

  ${media.mobile`
    font-size: 13px;
  `}
`;


