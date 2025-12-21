import { useState } from 'react';
import './QuestionList.scss';
import QuestionCard from './QuestionCard';
import Messages from '../assets/Messages.png';
import Mailbox from '../assets/Mailbox.png';

const DUMMY_QUESTIONS = [
  { 
    id: 1, 
    title: "스프린트 21기 5팀 인원은?", 
    content: "김민성, 김준석, 박지현, 주평안", 
    author: "아초는 고양이", 
    date: "3일전",
    answer: ""
  },
  { 
    id: 2, 
    title: "좋아하는 동물은?", 
    content: "고양이", 
    author: "아초는 고양이", 
    date: "2주전",
    answer: ""
  },
  { 
    id: 3, 
    title: "리액트 공부 방법은?", 
    content: "매일 실습 하기", 
    author: "아초는 고양이", 
    date: "1주전",
    answer: ""
  },
];

function QuestionList() {
  const [questions, setQuestions] = useState(DUMMY_QUESTIONS);

  const handleDeleteAll = () => {
    if (!window.confirm('모든 질문을 삭제하시겠습니까?')) return;
    setQuestions([]);
  };

  const handleDeleteOne = (id) => {
    if (!window.confirm('해당 질문을 삭제하시겠습니까?')) return;
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleUpdateAnswer = (id, newAnswer) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === id ? { ...q, answer: String(newAnswer) } : q
      )
    );
  };

  const hasQuestions = questions.length > 0;

  return (
    <section className="question-list">
      <div className="question-list__top">
        <button
          className={`delete-all ${!hasQuestions ? 'disabled' : ''}`}
          onClick={hasQuestions ? handleDeleteAll : null}
        >
          전체 삭제하기
        </button>
      </div>

      <div className="question-list__container">
        <div className="count">
          {hasQuestions ? (
            <>
              <img className="count-icon" src={Messages} alt="질문 아이콘" />
              <span>{questions.length}개의 질문이 있습니다</span>
            </>
          ) : (
            <span>아직 질문이 없습니다</span>
          )}
        </div>

        {!hasQuestions && (
          <div className="empty-illustration">
            <img src={Mailbox} alt="메일 상자" />
          </div>
        )}

        {hasQuestions && (
          <div className="question-list__body">
            {questions.map(q => (
              <QuestionCard
                key={q.id}
                question={q}
                onDelete={handleDeleteOne}
                onUpdateAnswer={handleUpdateAnswer}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default QuestionList;