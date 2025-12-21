import { useState, useEffect } from 'react';
import './QuestionReply.scss';

function QuestionReply({ answer, isEditing, onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isEditing) {
      setInputValue(answer !== undefined && answer !== null ? String(answer) : '');
    }
  }, [isEditing, answer]);

  if (answer && !isEditing) {
    return <div className="answer-box">{answer}</div>;
  }

  return (
    <div className="reply-container">
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
  );
}

export default QuestionReply;