import QuestionList from "./QuestionList";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    overflow-y: scroll;
  }
`;

function QuestionSection () {
  return(
    <div>
      <GlobalStyle />
      <QuestionList />
    </div>
  );
};

export default QuestionSection;