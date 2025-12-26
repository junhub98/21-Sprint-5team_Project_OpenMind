import MainHeader from '../components/MainPage/MainHeader/MainHeader';
import BrandLogo from '../components/MainPage/BrandLogo/BrandLogo';
import CreateFeedForm from '../components/MainPage/CreateFeedForm/CreateFeedForm';
import { Content, Page } from './MainPage.styles';

export default function MainPage() {
  return (
    <Page>
      <Content>
        <BrandLogo />
        <MainHeader />
        <CreateFeedForm />
      </Content>
    </Page>
  );
}
