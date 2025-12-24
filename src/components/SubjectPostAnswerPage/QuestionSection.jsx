import QuestionList from "./QuestionList";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    overflow-y: scroll;
  }
`;

function QuestionSection ( {subjectId}) {
  return(
    <div>
      <GlobalStyle />
      <QuestionList subjectId={subjectId}/>
    </div>
  );
};

export default QuestionSection;