import OpenMindImage from '../../assets/Mainpage/logo.png';
import { LogoBox, LogoImage } from './BrandLogo.styles';

export default function BrandLogo() {
  return (
    <LogoBox>
      <LogoImage
        src={OpenMindImage}
        alt="OpenMind 로고"
      />
    </LogoBox>
  );
}


