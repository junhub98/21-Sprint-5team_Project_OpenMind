import styled from 'styled-components';
import { parseSubjectName, createAnswer, updateAnswer } from '../../utils/getDataApi';
import { useRef, useState } from 'react';

const Container = styled.div`
  width: 620px;
  height: 268px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 35px;
`;

const AnswerForm = styled.form`
  width: 560px;
  height: 268px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px 0;
`;

const ProfileImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const Nickname = styled.span`
  font-family: 'pretendard';
  font-size: 18px;
  font-weight: 400;
  color: var(--gray-60);
  margin-right: 5px;
`;

const Tag = styled.span`
  font-family: 'pretendard';
  padding: 5px 10px 5px 10px;
  border: none;
  border-radius: 15px;
  background-color: var(--brown-20);
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-60);
`;

const UserInfo = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
`;

const AnswerTextArea = styled.textarea`
  width: 560px;
  height: 186px;
  padding: 15px 15px;
  border: none;
  border-radius: 8px;
  background-color: var(--gray-20);
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-60);
  resize: none;
`;

const SubmitButton = styled.button`
  width: 560px;
  height: 46px;
  background-color: ${({ $active }) => ($active ? 'var(--brown-40);' : 'var(--brown-30)')};
  border: none;
  border-radius: 8px;
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-10);
`;
export default function AnswerArea({ question, subject, isEdit }) {
  const { name, tag } = parseSubjectName(subject.name) || '';
  const [isActive, setIsActive] = useState(false);
  const textRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = textRef.current.value;
    if (!isEdit) {
      await createAnswer(question.id, content);
      window.location.reload();
    } else {
      await updateAnswer(question.answer.id, content);
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setIsActive(true);
    } else setIsActive(false);
  };
  return (
    <Container>
      <ProfileImg src={subject?.imageSource} />

      <AnswerForm onSubmit={handleSubmit}>
        <UserInfo>
          <Nickname>{name}</Nickname>
          {tag && <Tag>#{tag}</Tag>}
        </UserInfo>

        <AnswerTextArea placeholder="답변을 입력해주세요" onChange={handleChange} ref={textRef} />

        <SubmitButton $active={isActive} disabled={!isActive} type="submit">
          {isEdit ? '수정하기' : '답변하기'}
        </SubmitButton>
      </AnswerForm>
    </Container>
  );
}
