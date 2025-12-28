import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SocialButtons from './ProfileSocialButtons';
import Logo from '../../assets/SubjectPostAnswerPage/logo.png';
import LogoOpenmind from '../../assets/SubjectPostAnswerPage/logoOpenmind.png';
import Photo from '../../assets/SubjectPostAnswerPage/Photo.png';
import { getSubjectById } from '../../utils/getDataApi';
import media from '../../utils/media';

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
  top: 0;
  left: 0;
  width: 100%;
  height: 234px;
  
  object-fit: cover;

  ${media.tablet`
    width: 100%;
    height: 234px;
  `}

  ${media.mobile`
    width: 906px;
    height: 177px;
    left: 50%;
    transform: translateX(-50%);
    top:0;
  `}
`;

const CoverLogoLink = styled(Link)`
  cursor: pointer;
`;

const CoverLogo = styled.img`
  position: absolute;
  top: 50px;
  left: 50%;
  width: 170px;
  height: 67px;
  transform: translateX(-50%);
  display: inline-block;

  ${media.mobile`
    top: 40px;
    width: 124px;
    height: 49px;
  `}
`;

const ProfileInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 129px;
  transform: translateX(-50%);
  text-align: center;

  ${media.mobile`
    top: 101px;
  `}
`;

const ProfileAvatar = styled.img`
  width: 136px;
  height: 136px;
  border-radius: 50%;
  object-fit: cover;

  ${media.mobile`
    width: 104px;
    height: 104px;
  `}
`;

const ProfileName = styled.h3`
  top: 277px;
  width: 177px;
  height: 40px;
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: 0;
  text-align: center;
  color: #000000

  ${media.mobile`
    top: 217px;
    width: 133px;
    height: 30px;
    font-size: 23px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0;
    color: #000000
  `}
`;

const ProfileSocial = styled.div`
  position: absolute;
  top: 329px; 
  left: 50%;
  transform: translateX(-50%);
  width: 144px;
  height: 40px;

  display: flex;
  justify-content: center;
  
  ${media.mobile`
    top: 259px;
    width: 144px;
    height: 40px;
  `}
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