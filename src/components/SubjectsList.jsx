import styled from 'styled-components';
import SubjectCard from './SubjectCard';

const Container = styled.div`
  width: 940px;
  height: 394px;
  display: grid;
  margin-top: 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
`;

export default function SubjectsList({ subjects }) {
  return (
    <Container>
      {subjects.map((subject, index) => (
        <SubjectCard key={index} subject={subject} />
      ))}
    </Container>
  );
}
