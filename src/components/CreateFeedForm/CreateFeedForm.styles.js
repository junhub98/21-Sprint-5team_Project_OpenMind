import styled from 'styled-components';
import media from '../../utils/media';

export const Form = styled.form`
  width: 420px;
  padding: 28px 24px 32px;
  border-radius: 16px;
  background-color: #ffffff;
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
  border: 1px solid #d0c4b8;
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
  border: 1px solid #d0c4b8;
  background-color: #ffffff;
  color: #9a5d2c;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    border-color: #9a5d2c;
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
  background-color: #ffffff;
  border: 1px solid #d0c4b8;
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
  color: #333333;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  ${media.mobile`
    padding: 8px 14px;
    font-size: 13px;
  `}
`;

export const SelectedTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 6px;
  font-size: 13px;
  color: #9a5d2c;
  font-weight: 500;

  button {
    background: none;
    border: none;
    color: #9a5d2c;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      background-color: #e0e0e0;
    }
  }

  ${media.mobile`
    padding: 6px 10px;
    font-size: 12px;
  `}
`;

export const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background-color: #9a5d2c;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    background-color: #c7a38a;
    cursor: default;
  }

  ${media.mobile`
    font-size: 13px;
  `}
`;


