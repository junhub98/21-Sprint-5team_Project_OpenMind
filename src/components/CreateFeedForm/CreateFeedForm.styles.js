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
  border-radius: 8px;
  border: 1px solid #d0c4b8;
  font-size: 14px;
  outline: none;
  width: 100%;

  ${media.mobile`
    font-size: 13px;
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


