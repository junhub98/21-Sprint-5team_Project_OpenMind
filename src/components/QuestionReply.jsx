import { useState, useEffect } from 'react';
import ReactionButtons from './ReactionButtons';
import './QuestionReply.scss';

function QuestionReply({ answer, isEditing, onSubmit }) {
  const [inputValue, setInputValue] = useState('');


  const isAnswered = !!answer;

  useEffect(() => {
    if (isEditing) {
      setInputValue(answer !== undefined && answer !== null ? String(answer) : '');
    }
  }, [isEditing, answer]);
 
  return (
    <div className="reply-container">
      {(isEditing || !answer) && (
      <div>
        <textarea
          className="reply-input"
          placeholder="답변을 입력해주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="reply-button"
          disabled={!inputValue.trim()}
          type="button"
          onClick={() => onSubmit(inputValue)}
        >
          {answer ? '수정 완료' : '답변 완료'}
        </button>
      </div>  
      )}

      {answer && !isEditing && (
        <div>
          <div className='answer-box'>{answer}</div> 
        </div>
      )
      }

      <hr className='hr' />
      

      <ReactionButtons isAnswered={isAnswered} />
    </div>
    
  );
}

export default QuestionReply;