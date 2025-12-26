import styles from './FeedHeader.module.css';
import bannerImage from '../../../assets/PersonalImages/bannerImage.svg';
import logoImage from '../../../assets/PersonalImages/logo.svg';
import profileImage from '../../../assets/PersonalImages/profileImage.svg';
import linkImage from '../../../assets/PersonalImages/linkImage.svg';
import kakaoImage from '../../../assets/PersonalImages/kakaoImage.svg';
import facebookImage from '../../../assets/PersonalImages/facebookImage.svg';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function FeedHeader() {
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();

  const Url = `${window.location.origin}${location.pathname}`;

  const copyTextUrl = async () => {
    try {
      await navigator.clipboard.writeText(Url);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch {
      console.log('링크 복사에 실패했습니다');
    }
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.bannerContainer}>
        <img src={bannerImage} className={styles.bannerImage} alt="bannerImage" />
      </div>

      <div className={styles.profileContainer}>
        <img src={logoImage} className={styles.logoImage} alt="logoImage" />
        <img src={profileImage} className={styles.profileImage} alt="profileImage" />
        <h2 className={styles.profileTitle}>아초는고양이</h2>

        <div className={styles.socialContainer}>
          <button type="button" onClick={copyTextUrl}>
            <img src={linkImage} className={styles.linkImage} alt="Copy link" />
          </button>
          <a href="https://kakao.com" target="_blank">
            <img src={kakaoImage} className={styles.kakaoImage} alt="Open kakao" />
          </a>
          <a href="https://facebook.com" target="_blank">
            <img src={facebookImage} className={styles.facebookImage} alt="Open facebook" />
          </a>
        </div>
      </div>
      {showToast && <div className={styles.toast}>링크가 복사되었습니다</div>}
    </div>
  );
}
