import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SocialButtons from './ProfileSocialButtons';
import Logo from '../../assets/SubjectPostAnswerPage/logo.png';
import LogoOpenmind from '../../assets/SubjectPostAnswerPage/logoOpenmind.png';
import Photo from '../../assets/SubjectPostAnswerPage/Photo.png';
import { getSubjectById } from '../../utils/getDataApi';

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
function ProfileHeader( {subjectId}) {
  const [subject, setSubject] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!subjectId) return;

    async function fetchsubject() {
      try {
        const data = await getSubjectById(subjectId);
        setSubject(data);
      } catch (error) {
        console.error('프로필 불러오기 실패', error);
        setError(true);
      } 
    }

    fetchsubject();
  }, [subjectId]);

  if(error) {
    return <div> 프로필 정보를 불러올수 없습니다.</div>;
  }

  if(!subject) {
    return <div> 프로필 정보 로딩중.</div>;
  }


  return (
    <ProfileHeaderWrapper>
      <ProfileCover>
        <CoverIllustration src={Logo} alt="실전화기" />
        <CoverLogoLink to="/">
          <CoverLogo src={LogoOpenmind} alt="오픈마인드 로고" />
        </CoverLogoLink>
      </ProfileCover>

      <ProfileInfo>
        <ProfileAvatar 
          src={subject?.imageSource || Photo} 
          alt='프로필 사진'
        />
          
        <ProfileName>
          {subject?.name || '이름 없음'}
        </ProfileName>
      </ProfileInfo>

      <ProfileSocial>
        <SocialButtons />
      </ProfileSocial>
    </ProfileHeaderWrapper>
  );
}

export default ProfileHeader;