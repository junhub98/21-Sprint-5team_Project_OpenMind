import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createAnswer, updateAnswer } from '../../utils/getDataApi';

// styled-components
const ReplyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #818181;
  margin-top: 4px;
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
  width: 100%;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #542f1a;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

// 날짜 계산 함수
function QuestionDate(dateString) {
  if (!dateString) return '';
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return '오늘';
  if (days < 7) return `${days}일 전`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}주 전`;
  const months = Math.floor(days / 30);
  return `${months}개월 전`;
}

// 메인 컴포넌트
function QuestionReply({ answer = null, isEditing, onUpdateAnswer, questionId, onFinishEdit }) {
  const [content, setContent] = useState(answer?.content ?? '');
  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(answer?.id);

  useEffect(() => {
    setContent(answer?.content ?? '');
  }, [answer]);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);

    try {
      const updatedAnswer = answer?.id
        ? await updateAnswer(answer.id, content)
        : await createAnswer(questionId, content);

      onUpdateAnswer(questionId, updatedAnswer);

      onFinishEdit?.();
    } catch (error) {
      console.error('답변 제출 실패', error);
      alert('답변 제출에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const displayTime = answer?.updateAt || answer?.createdAt;

  return (
    <ReplyWrapper>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        readOnly={!isEditing || loading}
        placeholder="답변을 입력하세요."
      />

      {isEditing && (
        <ButtonWrapper>
          <SubmitButton onClick={handleSubmit} disabled={!content.trim() || loading}>
            {isEditMode ? '수정완료' : '답변 완료'}
          </SubmitButton>
        </ButtonWrapper>
      )}

      {answer?.createdAt && displayTime && (
        <Meta>
          작성자: {answer.authorId} · {QuestionDate(displayTime)}
        </Meta>
      )}
      <hr />
    </ReplyWrapper>
  );
}

export default QuestionReply;
