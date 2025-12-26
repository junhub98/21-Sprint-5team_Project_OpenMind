import { useState } from 'react';
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
function QuestionReply({ question, isEditing, onUpdateAnswer }) {
  const initialContent = question.content || '';

  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content) return;
    setLoading(true);

    try {
      let updatedAnswer;
      if (question.answerId) {    // 기존 답변이 있으면 PATCH
        updatedAnswer = await updateAnswer(question.answerId, content);
      } else {                    // 답변이 없으면 POST
        updatedAnswer = await createAnswer(question.id, content);
      }
      onUpdateAnswer(question.id, updatedAnswer);
      setContent(updatedAnswer.content);
    } catch (err) {
      console.error('답변 제출 실패', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReplyWrapper>
      {question.createdAt && <CreatedAt>{question.createdAt}</CreatedAt>}
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        readOnly={!isEditing || loading}
      />
      {isEditing && (
        <SubmitButton onClick={handleSubmit} disabled={loading}>
          {loading ? '저장중...' : '등록'}
        </SubmitButton>
      )}
      <hr />
    </ReplyWrapper>
  );
}

export default QuestionReply;