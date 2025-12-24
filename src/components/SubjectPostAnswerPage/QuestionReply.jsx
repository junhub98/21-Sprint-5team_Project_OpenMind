import { useState, useEffect, memo, useCallback, useRef } from 'react';
import styled, {css} from 'styled-components';
import ReactionButtons from './ReactionButtons';

// styled-components 
const replyBoxCommon = css`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 12px;
  box-sizing: border-box;
`;

const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReplyInput = styled.textarea `
  ${replyBoxCommon}

  background-color: #f9f9f9;
  border: 1px solid #e5d8cc;
  
  height: 186px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #542f1a;
  }
`;

const ReplyButton = styled.button`
  width: 100%;              
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  background-color: #542f1a;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const AnswerBox = styled.div`
  ${replyBoxCommon}

  background-color: #f9f9f9;
  border: 1px solid #e5d8cc;
  color: #542f1a;
  white-space: pre-wrap;
  height: 186px;

  padding-bottom: calc(12px + 48px);
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #cfcfcf;
  margin: 20px, 0;
`;

//답변 입력 수정
const ReplyEditor = memo(function ReplyEditor({
  answer,
  isEditing,
  onSubmit,
}) {
  const inputRef = useRef('');
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    if (isEditing) {
      inputRef.current = answer ?? '';
      setHasValue(!!answer?.trim());
    }
  }, [isEditing, answer]);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    inputRef.current = value;
    setHasValue(!!value.trim());
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(inputRef.current);
  }, [onSubmit]);

  console.log('ReplyEditor render');

  if (answer && !isEditing) {
    return <AnswerBox>{answer}</AnswerBox>;
  }

  return (
    <>
      <ReplyInput
        placeholder="답변을 입력해주세요"
        defaultValue={inputRef.current}
        onChange={handleChange}
      />

      <SubmitButton
        hasValue={hasValue}
        isEditing={!!answer}
        onClick={handleSubmit}
      />
    </>
  );
});

// 버튼
const SubmitButton = memo(function SubmitButton({
  hasValue,
  isEditing,
  onClick,
}) {
  console.log('SubmitButton render');

  return (
    <ReplyButton disabled={!hasValue} onClick={onClick}>
      {isEditing ? '수정 완료' : '답변 완료'}
    </ReplyButton>
  );
});


// 밑줄 선
const Line = memo(function Line() {
  return <Hr />
});

// 좋아요, 싫어요
const ReactionSection = memo(function ReactionSection({ isAnswered }) {
  return <ReactionButtons isAnswered={isAnswered} />;
}); 

// 메인컴포넌트
function QuestionReply({ answer, isEditing, onSubmit }) {
  const isAnswered = !!answer;

  return (
    <ReplyContainer>
      <ReplyEditor
        answer={answer}
        isEditing={isEditing}
        onSubmit={onSubmit}
      />
      <Line />
      <ReactionSection 
        isAnswered={isAnswered} />
    </ReplyContainer>
  );
}

export default memo(QuestionReply);