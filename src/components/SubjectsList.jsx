import styled from 'styled-components';
import SubjectCard from './SubjectCard';
import media from '../utils/media';
import SubjectLoadingCard from './SubjectLoadingCard';

const Container = styled.div`
  width: 940px;
  height: 394px;
  display: grid;
  margin-top: 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;

  ${media.tabletBig`
    width: clamp(886px, 78.3vw ,940px);
  `}

  ${media.tablet`
    width: clamp(700px, 91vw ,886px);
  `}

  ${media.sixCardsList`
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
  `}

  ${media.mobile`
    width: clamp(327px, 87vw ,700px);
    height: 536px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 16px;
    margin-top: 16px;
    
  `}
  &:hover {
    overflow: visible;
  }
`;

export default function SubjectsList({ subjects, isLoading, pageSize }) {
  return (
    <Container>
      {isLoading
        ? Array.from({ length: pageSize }).map((_, index) => <SubjectLoadingCard key={index} />)
        : subjects.map((subject, index) => <SubjectCard key={index} subject={subject} />)}
    </Container>
  );
}
