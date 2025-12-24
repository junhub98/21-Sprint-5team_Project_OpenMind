import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import closeIc from '../assets/close.png';
import { createQuestion } from './getDataApi';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background-color: var(--gray-10);
  padding: 40px 40px;
  border-radius: 24px;
  width: 612px;
  height: 454px;
  font-family: 'pretendard';
  font-weight: 400;
  color: var(--gray-60);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.span`
  font-size: 24px;

  margin-bottom: 40px;
`;

const UserProfile = styled.span`
  font-family: 'pretendard';
  font-size: 16px;
`;

const UserImg = styled.img`
  width: 28px;
  height: 28px;
`;

const QuestionText = styled.textarea`
  margin-top: 10px;
  width: 532px;
  height: 180px;
  background-color: var(--gray-20);
  border: none;
  border-radius: 8px;
`;

const SubmitButton = styled.button`
  width: 532px;
  height: 46px;
  border: none;
  border-radius: 8px;
  background-color: ${({ $active }) => ($active ? 'var(--brown-30)' : 'var(--brown-40)')};
`;
export default function Modal({ open, onClose, subject }) {
  if (!open) return null;

  const [isActive, setIsActive] = useState(false);
  const textRef = useRef(null);

  const handleChange = () => {
    if (textRef.current.value.length > 0) setIsActive(true);
    else setIsActive(false);
  };

  const handleClick = () => {
    if (textRef.current.value) createQuestion(subject.id, textRef.current.value);
    onClose();
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>질문을 작성하세요</Title>
          <img src={closeIc} onClick={onClose} alt="닫기 버튼" />
        </Header>
        <UserProfile>
          <UserImg src={subject.image} alt="유저 프로필사진" />
          {subject.name}
        </UserProfile>

        <QuestionText onChange={handleChange} placeholder="질문을 입력해주세요" ref={textRef} />

        <SubmitButton $active={isActive} onClick={handleClick}>
          질문 보내기
        </SubmitButton>
      </Content>
    </Overlay>,
    document.body,
  );
}
