// 질문 영역 담당 섹션 컴포넌트
import QuestionList from "./QuestionList";

function QuestionSection ( {subjectId}) {
  return(
    <>      
      <QuestionList subjectId={subjectId}/>
    </>
  );
};

export default QuestionSection;