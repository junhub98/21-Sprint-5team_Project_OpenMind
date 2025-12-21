/* 질문 답변 헤더 */
import { Link } from 'react-router-dom';
import './ProfileHeader.scss';
import styled from 'styled-components';
import SocialButtons from './ProfileSocialButtons';
import Logo from '../assets/logo.png';
import LogoOpenmind from '../assets/logoOpenmind.png';
import Photo from '../assets/Photo.png';



function ProfileHeader () {
  return(
    <section className="profile-header">

      <div className="profile-cover">
        <img className="cover-illustration" src={Logo} alt="실전화기" />
        <Link to="/" className="cover-logo-link">
          <img className="cover-logo" src={LogoOpenmind} alt="오픈마인드 로고" />
        </Link>
      </div>

      <div className="profile-info">  {/* ID 값 받아오기 */}
        <img className="profile-avatar" src={Photo} alt="프로필 사진" />
        <h3 className="profile-name">아초는 고양이</h3> 
      </div>

      <div className="profile-social">
        <SocialButtons />
      </div>
        
    </section>
  );
};

export default ProfileHeader