import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import closeIc from '../assets/PersonalImages/close.png';
import { createQuestion, getSubjectById } from './getDataApi';
import messages from '../assets/PersonalImages/messages.png';

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
  display: flex;
  align-items: center;
  font-size: 24px;
  gap: 0 5px;
  margin-bottom: 40px;
`;

const UserProfile = styled.span`
  display: flex;
  align-items: center;
  gap: 0 5px;
  font-family: 'pretendard';
  font-size: 18px;
  font-weight: 400;
`;

const NickName = styled.span`
  font-size: 16px;
`;
const UserImg = styled.img`
  border-radius: 14px;
  width: 28px;
  height: 28px;
`;

const CloseBtn = styled.img`
  cursor: pointer;
`;

const QuestionText = styled.textarea`
  margin-top: 10px;
  width: 532px;
  height: 180px;
  background-color: var(--gray-20);
  border: none;
  border-radius: 8px;
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  padding: 16px 16px;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 532px;
  height: 46px;
  border: none;
  color: var(--gray-10);
  border-radius: 8px;
  background-color: ${({ $active }) => ($active ? 'var(--brown-40)' : 'var(--brown-30)')};
  margin-top: 5px;
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
`;
export default function ModalCreateQuestion({ setOnClose, subjectId }) {
  const [isActive, setIsActive] = useState(false);
  const [subject, setSubject] = useState({});
  const textRef = useRef(null);

  useEffect(() => {
    async function loadsubject() {
      try {
        const data = await getSubjectById(subjectId);
        setSubject(data);
      } catch (err) {
        console.log(err);
      }
    }
    loadsubject();
  }, [subjectId]);

  const handleChange = () => {
    if (textRef.current.value.length > 0) setIsActive(true);
    else setIsActive(false);
  };

  const handleClick = () => {
    if (textRef.current.value) {
      createQuestion(subject.id, textRef.current.value);
      setOnClose();
    } else {
      alert('질문을 입력해주세요.');
    }
  };

  return createPortal(
    <Overlay onClick={setOnClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            <img src={messages} />
            질문을 작성하세요
          </Title>
          <CloseBtn src={closeIc} onClick={setOnClose} alt="닫기 버튼" />
        </Header>

        <UserProfile>
          To.
          <UserImg src={subject?.imageSource} alt="유저 프로필사진" />
          <NickName>{subject?.name}</NickName>
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
