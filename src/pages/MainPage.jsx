import MainHeader from '../components/MainHeader/MainHeader';
import BrandLogo from '../components/BrandLogo/BrandLogo';
import CreateFeedForm from '../components/CreateFeedForm/CreateFeedForm';
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
