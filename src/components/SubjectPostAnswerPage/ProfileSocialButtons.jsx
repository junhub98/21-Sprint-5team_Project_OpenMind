import ReactDom from 'react-dom';
import { useState, memo, useEffect } from 'react';
import styled from 'styled-components';
import ShareLink from '../../assets/SubjectPostAnswerPage/ShareLinkIcon.png';
import ShareKakao from '../../assets/SubjectPostAnswerPage/ShareKakaoIcon.png';
import ShareFacebook from '../../assets/SubjectPostAnswerPage/ShareFacebookIcon.png';
import media from '../../utils/media';

// styled-components
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ImageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px 16px 12px 16px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    opacity: 0.5;
  }

  img {
    display: block;
    width: 40px;
    height: 40px;
  }
`;

const Toast = styled.div`
  position: fixed;
  top: 787px;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 167px;
  height: 42px;
  background-color: #000000;
  color: #ffffff;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 12px 20px;

  ${media.mobile`
    top: 667px;
  `}
`;

const ToastText = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0;
  text-align: center;
  white-space: nowrap;
`;
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
      {showToast &&
        ReactDom.createPortal(
          <Toast>
            <ToastText>URL이 복사되었습니다</ToastText>
          </Toast>,
          document.body,
        )}
    </>
  );
});

// 카카오톡 공유하기

const apiUrl = 'b135abcb6252f77e0ea32025ae44c171';

const KakaoButton = memo(function KakaoButton() {
  useEffect(() => {
    // 이미 로드돼 있으면 바로 init
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(apiUrl);
      }
      return;
    }

    // SDK 로딩
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;
    // SDK 로딩 완료시 init
    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(apiUrl);
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
    <ButtonGroup>
      <LinkCopyButton />
      <KakaoButton />
      <FacebookButton />
    </ButtonGroup>
  );
}

export default SocialButtons;
