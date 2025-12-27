/*소셜 네트워크 서비스 버튼 */
import { useState, memo, useEffect } from 'react';
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
// 링크 복사하기
const LinkCopyButton = memo(function LinkCopyButton() {
  const [showToast, setShowToast] = useState(false);
  const url = window.location.href;

  const handleCopyLinkClick = async () => {
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
      <ImageButton onClick={handleCopyLinkClick}>
        <img src={ShareLink} alt="링크복사" />
      </ImageButton>
      {showToast && <Toast>URL이 복사되었습니다</Toast>}
    </>
  );
});

// 카카오톡 공유하기

const KAKAO_JS_KEY = '비공개KEY';

const KakaoButton = memo(function KakaoButton() {
  useEffect(() => {
    // 이미 로드돼 있으면 바로 init
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
        console.log('Kakao initialized (existing)');
      }
      return;
    }

    // SDK 로딩
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;

    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
        console.log('Kakao initialized (loaded)');
      }
    };

    script.onerror = () => {
      console.error('Failed to load Kakao SDK');
    };

    document.head.appendChild(script);
  }, []);

  const handleKakaoShare = () => {
    if (!window.Kakao?.Share) {
      console.error('Kakao Share not available');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '질문을 공유해보세요',
        description: '이 질문에 답변을 남겨주세요!',
        imageUrl: 'https://via.placeholder.com/640x480',
        link: {
          mobileWebUrl: 'https://sprint21-5openmind.netlify.app',
          webUrl: 'https://sprint21-5openmind.netlify.app',
        },
      },
      buttons: [
        {
          title: '웹에서 보기',
          link: {
            mobileWebUrl: 'https://sprint21-5openmind.netlify.app',
            webUrl: 'https://sprint21-5openmind.netlify.app',
          },
        },
      ],
    });
  };

  return (
    <ImageButton onClick={handleKakaoShare}>
      <img src={ShareKakao} alt="카카오 공유" />
    </ImageButton>
  );
});

// 페이스북 공유하기
const FacebookButton = memo(function FacebookButton() {
  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      `_blank`,
      `width=1200, height=1200`,
    );
  };

  return (
    <>
      <ImageButton onClick={handleFacebookShare}>
        <img src={ShareFacebook} alt="페이스북 공유" />
      </ImageButton>
    </>
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
}

export default SocialButtons;
