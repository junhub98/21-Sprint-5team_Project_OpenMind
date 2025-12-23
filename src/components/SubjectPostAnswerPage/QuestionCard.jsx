import { useState } from 'react';
import styled from 'styled-components';
import QuestionReply from './QuestionReply';
import KebabMenu from './KebabMenu';

const Card = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(140, 140, 140, 0.25);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
`;

const Status = styled.span`
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid;
  background-color: transparent;
  line-height: 1;

  color: ${(props) => (props.$done ? '#542f1a' : '#c8b6a6')};
  border-color: ${(props) => (props.$done ? '#542f1a' : '#c8b6a6')};
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;

const Meta = styled.div`
  font-size: 14px;
  color: #818181;
`;

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
    
    <Card>
      <CardTop>
        <Status $done={isAnswered} >
          {isAnswered ? '답변완료' : '미답변'}
        </Status>

        <KebabMenu
          onEdit={handleEdit}
          onDelete={() => onDelete(question.id)}
          onReject={handleReject}
        />
      </CardTop>

      <Meta>
        {question.author} · {question.date}
      </Meta>

      <Title>
        {question.title}
      </Title>

      <QuestionReply
        answer={question.answer}
        isEditing={isEditing}
        onSubmit={handleSubmitAnswer}
      />
    </Card>
  );
}

export default QuestionCard;