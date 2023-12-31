import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer = ({ currentLanguage }) => {
  const { t } = useTranslation('global');

  return (
    <footer className={styles.footerContainer}>
        <div className={styles.divLeft}>
            <p>© {new Date().getFullYear()}{t("footer.all-rights-reserved", { lng: currentLanguage})}</p>
        </div>
        <div className={styles.divRight}>
            <div className={styles.info}><Link to='/about' style={{textDecoration: "none"}}><p>{t("footer.about-us", { lng: currentLanguage })}</p></Link></div>
            <div className={styles.info}><Link to='/privacy_policy' style={{textDecoration: "none"}}><p>{t("footer.privacy-policy", {lng: currentLanguage})}</p></Link></div>
            <div className={styles.info}><Link to='/terms_&_conditions' style={{textDecoration: "none"}}><p>{t("footer.terms-and-conditions", {lng: currentLanguage})}</p></Link></div>
            <div className={styles.info}><Link to='/contact' style={{textDecoration: "none"}}><p>{t("footer.contact-us", {lng: currentLanguage})}</p></Link></div>
        </div>
    </footer>
  );
};

