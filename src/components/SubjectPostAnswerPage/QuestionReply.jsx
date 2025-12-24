import { useState, useEffect } from 'react';
import styled from 'styled-components';

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
function QuestionReply({ answer, createdAt, isEditing, onSubmit }) {
  const [value, setValue] = useState(answer || '');

  useEffect(() => {
    setValue(answer || '');
  }, [answer]);

  const handleSubmit = () => {
    if (!value.trim()) {
      alert('답변 내용을 입력해주세요.');
      return;
    }
    onSubmit(value);
  };

  return (
    <ReplyWrapper>
      {answer && createdAt && (
        <CreatedAt>
          답변 작성: {new Date(createdAt).toLocaleString()}
        </CreatedAt>
      )}

      {(isEditing || !answer) && (
        <>
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="답변을 작성하세요"
          />
          <ButtonWrapper>
            <SubmitButton onClick={handleSubmit}>
              {answer ? '수정 완료' : '답변 등록'}
            </SubmitButton>
          </ButtonWrapper>
        </>
      )}

      {!isEditing && answer && (
        <p>{value}</p>
      )}
    </ReplyWrapper>
  );
}

export default QuestionReply;