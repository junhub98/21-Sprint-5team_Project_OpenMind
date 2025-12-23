/*소셜 네트워크 서비스 버튼 */
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import ShareLink from '../../assets/SubjectPostAnswerPage/ShareLinkIcon.png';
import ShareKakao from '../../assets/SubjectPostAnswerPage/ShareKakaoIcon.png';
import ShareFacebook from '../../assets/SubjectPostAnswerPage/ShareFacebookIcon.png';

const ImageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;

  &:hover {
    opacity: 0.5;
  }

  img {
    display: block;
  }

`;

const Toast = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);

  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;

  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;

  z-index: 1000;
`;


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
      <ImageButton onClick={LinkHandleClick}>
        <img src={ShareLink} alt="링크 복사" />
      </ImageButton>

      <ImageButton onClick={KakaoHandleClick}>
        <img src={ShareKakao} alt="카카오 공유" />
      </ImageButton>

      <ImageButton onClick={FacebookHandleClick}>
        <img src={ShareFacebook} alt="페이스북 공유" />
      </ImageButton>

      {showToast && <Toast>URL이 복사되었습니다</Toast>}
    </>
  );
};

export default SocialButtons;