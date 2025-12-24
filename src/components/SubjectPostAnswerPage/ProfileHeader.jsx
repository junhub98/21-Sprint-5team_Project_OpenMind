import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import styled from 'styled-components';
import SocialButtons from './ProfileSocialButtons';
import Logo from '../../assets/SubjectPostAnswerPage/logo.png';
import LogoOpenmind from '../../assets/SubjectPostAnswerPage/logoOpenmind.png';
import Photo from '../../assets/SubjectPostAnswerPage/Photo.png';

// styled-components 
const ProfileHeaderWrapper = styled.section`
  width: 100%;
  position: relative;
`;

const ProfileCover = styled.div`
  position: relative;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CoverIllustration = styled.img`
  position: absolute;
  width: 1200px;
  max-width: none;
  object-fit: contain;
`;

const CoverLogoLink = styled(Link)`
  cursor: pointer;
`;

const CoverLogo = styled.img`
  position: absolute;
  top: 30px;
  transform: translateX(-50%);
  display: inline-block;
`;

const ProfileInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 110px;
  transform: translateX(-50%);
  text-align: center;
`;

const ProfileAvatar = styled.img`
  width: 136px;
  height: 136px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.h3`
  margin-top: 12px;
  font-size: 20px;
  font-weight: 600;
`;

const ProfileSocial = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;

// 메인컴포넌트 프로필 그림, 사진 등등
function ProfileHeader( {userId}) {
  const [profileName, setProfileName] = useState('');
  const [profileAvatar, setProfileAvartar] = useState('');

  useEffect ( () => {
    async function fetchProfile() {
      try {
        const response = await axios.get(`/users/${userId}`);
        setProfileName (response.data.name);
        setProfileAvartar (response.data.avartar);

      } catch (error) {
        console.log('프로필 불러오기 실패', error);
      }
    }
    fetchProfile();
  } , [userId]);

  return (
    <ProfileHeaderWrapper>
      <ProfileCover>
        <CoverIllustration src={Logo} alt="실전화기" />
        <CoverLogoLink to="/">
          <CoverLogo src={LogoOpenmind} alt="오픈마인드 로고" />
        </CoverLogoLink>
      </ProfileCover>

      <ProfileInfo>
        <ProfileAvatar src={profileAvatar || Photo} alt="프로필 사진" />
        <ProfileName>{profileName || '사용자'}</ProfileName>
      </ProfileInfo>

      <ProfileSocial>
        <SocialButtons />
      </ProfileSocial>
    </ProfileHeaderWrapper>
  );
}

export default ProfileHeader;