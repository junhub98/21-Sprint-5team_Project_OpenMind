import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createAnswer, updateAnswer } from '../../utils/getDataApi';

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CreatedAt = styled.span`
  font-size: 12px;
  color: #818181;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid #e5d8cc;
  resize: vertical;
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const SubmitButton = styled.button`
  background-color: #542f1a;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
// 메인 컴포넌트
function QuestionReply({ answer, isEditing, onSubmit }) {
  const [content, setContent] = useState(answer || '');

  const handleSubmit = async () => {
    try {
      if (answer) {
        await updateAnswer(answer.id, content);
      } else {
        const newAnswer = await createAnswer(1, content); // 🔹 subjectId 필요시 상위에서 전달
        onSubmit(newAnswer);
      }
    } catch (err) {
      console.error('답변 등록 실패', err);
    }
  };

  if (!isEditing) return <div>{answer || '아직 답변이 없습니다.'}</div>;

  return (
    <ReplyWrapper>
      <AnswerTextarea value={content} onChange={(e) => setContent(e.target.value)} />
      <Button onClick={handleSubmit}>등록</Button>
      <hr />
    </ReplyWrapper>
  );
}

export default QuestionReply;