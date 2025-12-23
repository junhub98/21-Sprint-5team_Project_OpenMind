import { useState, useEffect } from 'react';
import styled, {css} from 'styled-components';
import ReactionButtons from './ReactionButtons';

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

function QuestionReply({ answer, isEditing, onSubmit }) {
  const [inputValue, setInputValue] = useState('');


  const isAnswered = !!answer;

  useEffect(() => {
    if (isEditing) {
      setInputValue(answer !== undefined && answer !== null ? String(answer) : '');
    }
  }, [isEditing, answer]);
 
  return (
    <ReplyContainer>
      {(isEditing || !answer) && (
      <div>
        <ReplyInput
          placeholder="답변을 입력해주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <ReplyButton
          disabled={!inputValue.trim()}
          type="button"
          onClick={() => onSubmit(inputValue)}
        >
          {answer ? '수정 완료' : '답변 완료'}
        </ReplyButton>
      </div>  
      )}

      {answer && !isEditing && (
        <div>
          <AnswerBox>{answer}</AnswerBox> 
        </div>
      )
      }

      <Hr />
      

      <ReactionButtons isAnswered={isAnswered} />
    </ReplyContainer>
    
  );
}

export default QuestionReply;