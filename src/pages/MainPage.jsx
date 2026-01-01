import MainHeader from '../components/MainPage/MainHeader/MainHeader';
import BrandLogo from '../components/MainPage/BrandLogo/BrandLogo';
import CreateFeedForm from '../components/MainPage/CreateFeedForm/CreateFeedForm';
import { Content, Page } from './MainPage.styles';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% { opacity:0; transform: translateY(20px); }
  100% { opacity:1; transform: translateY(0); }
`;

const FadeInBox = styled.div`
  animation: ${fadeIn} 0.6s ease forwards;
`;

export default function MainPage() {
  return (
    <Page>
      <Content>
        <FadeInBox>
          <BrandLogo />
        </FadeInBox>
        <MainHeader />
        <FadeInBox>
          <CreateFeedForm />
        </FadeInBox>
      </Content>
    </Page>
  );
}
