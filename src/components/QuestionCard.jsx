import { useState } from 'react';
import QuestionReply from './QuestionReply';
import KebabMenu from './KebabMenu';
import './QuestionCard.scss';

function QuestionCard({ question, onDelete, onUpdateAnswer }) {
  const [isEditing, setIsEditing] = useState(false);
  const isAnswered = Boolean(question.answer);

  const handleEdit = () => setIsEditing(true);

  const handleSubmitAnswer = (newAnswer) => {
    onUpdateAnswer(question.id, String(newAnswer));
    setIsEditing(false);
  };

  const handleReject = () => {
    onUpdateAnswer(question.id, '답변 거절');
    setIsEditing(false);
  };

  return (
    
    <div className="question-card">
      <div className="question-card__top">
        <span className={`status ${isAnswered ? 'done' : 'pending'}`}>
          {isAnswered ? '답변완료' : '미답변'}
        </span>

        <KebabMenu
          onEdit={handleEdit}
          onDelete={() => onDelete(question.id)}
          onReject={handleReject}
        />
      </div>

      <div className="meta">
        {question.author} · {question.date}
      </div>

      <h3 className="title">{question.title}</h3>

      <QuestionReply
        answer={question.answer}
        isEditing={isEditing}
        onSubmit={handleSubmitAnswer}
      />
    </div>
  );
}

export default QuestionCard;