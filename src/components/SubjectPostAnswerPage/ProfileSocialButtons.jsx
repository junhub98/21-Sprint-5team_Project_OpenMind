/*소셜 네트워크 서비스 버튼 */
import { useState, memo } from 'react';
import styled from 'styled-components';
import ShareLink from '../../assets/SubjectPostAnswerPage/ShareLinkIcon.png';
import ShareKakao from '../../assets/SubjectPostAnswerPage/ShareKakaoIcon.png';
import ShareFacebook from '../../assets/SubjectPostAnswerPage/ShareFacebookIcon.png';

// styled-components 
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

// 컴포넌트 분리 (리렌더링 범위 관리) React.memo 사용
const LinkCopyButton = memo(  function LinkCopyButton() {
  const [showToast, setShowToast] = useState(false);
  const url = window.location.href;

  const HandleClick = async () => {
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
  
  return (
    <>
      <ImageButton onClick={HandleClick}>
        <img src={ShareLink} alt="링크복사" />
      </ImageButton>
      {showToast && <Toast>URL이 복사되었습니다</Toast>}
    </>
  );

});

const KakaoButton = memo(function KakaoButton() {
  return (
    <ImageButton onClick={() => alert('카카오톡')}>
      <img src={ShareKakao} alt="카카오 공유" />
    </ImageButton>
  );
});

const FacebookButton = memo(function FacebookButton() {
  return (
    <ImageButton onClick={() => alert('페이스북')}>
      <img src={ShareFacebook} alt="페이스북 공유" />
    </ImageButton>
  );
});

// 메인 컴포넌트
function SocialButtons() {
  
  return (
    <>
      <LinkCopyButton />
      <KakaoButton />
      <FacebookButton />
    </>
  );
};

export default SocialButtons;