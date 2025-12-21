/*소셜 네트워크 서비스 버튼 */
import './ProfileSocialButtons.scss';
import styled from 'styled-components';
import ShareLink from '../assets/ShareLinkIcon.png';
import ShareKakao from '../assets/ShareKakaoIcon.png';
import ShareFacebook from '../assets/ShareFacebookIcon.png';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


function SocialButtons() {
  const location = useLocation();

  const [showToast, setShowToast] = useState(false);

  const url = window.location.href;

  const LinkHandleClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (error) {
      console.error('URL 복사 실패', error);
    }
  };

  const KakaoHandleClick = () => {
    alert('카카오톡!');
  };

  const FacebookHandleClick = () => {
    alert('페이스북!');
  };

  return (
    <>
      <button className="image-button" onClick={LinkHandleClick}>
        <img src={ShareLink} alt="링크 복사" />
      </button>

      <button className="image-button" onClick={KakaoHandleClick}>
        <img src={ShareKakao} alt="카카오 공유" />
      </button>

      <button className="image-button" onClick={FacebookHandleClick}>
        <img src={ShareFacebook} alt="페이스북 공유" />
      </button>

      {showToast && <div className='toast'>URL이 복사되었습니다</div>}
    </>
  );
};

export default SocialButtons;