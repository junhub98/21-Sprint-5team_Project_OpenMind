/*소셜 네트워크 서비스 버튼 */
import styled from 'styled-components';
import ShareLink from '../assets/ShareLinkIcon.png';
import ShareKakao from '../assets/ShareKakaoIcon.png';
import ShareFacebook from '../assets/ShareFacebookIcon.png';

const ImageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  
  &:hover {
    opacity: 0.5;
  }
`;

export default function SocialButtons() {
  const LinkHandleClick = () => {
    alert('링크!');
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
        <img src={ShareLink} alt="외부링크" />
      </ImageButton>
      <ImageButton onClick={KakaoHandleClick}>
        <img src={ShareKakao} alt="카카오" />
      </ImageButton>
      <ImageButton onClick={FacebookHandleClick}>
        <img src={ShareFacebook} alt="페이스북" />
      </ImageButton>
    </>
  );
};
