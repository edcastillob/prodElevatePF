import React, { useEffect } from 'react';
import styles from "./PrivacyPolicy.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

export const PrivacyPolicy = ({ currentLanguage }) => {
  const { t } = useTranslation('global');
  useEffect(() => {
    AOS.init({
      
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>{t("privacy-policy.privacy-policy", { lng: currentLanguage })}</h1>
      <div className={styles.subtitle}>
        <h6 data-aos="fade-up">
        {t("privacy-policy.at", { lng: currentLanguage })} <b>ProdElevate</b>, {t("privacy-policy.text-1-1", { lng: currentLanguage })}
        </h6>
      </div>
      <div className={styles.infoCards}>
        <div data-aos="fade-left" className={styles.card}>
        <h5>{t("privacy-policy.info-1", { lng: currentLanguage })}</h5>
        <p>
          <b>ProdElevate</b> {t("privacy-policy.info-1-text", { lng: currentLanguage })}
        </p>
        </div>

        <div data-aos="fade-left" className={styles.card}>
        <h5>{t("privacy-policy.info-2", { lng: currentLanguage })}</h5>
        <p>
        {t("privacy-policy.info-2-text", { lng: currentLanguage })} <b>ProdElevate</b>.
        </p>
        </div>

        <div data-aos="fade-left" className={styles.card}>
        <h5>{t("privacy-policy.info-3", { lng: currentLanguage })}</h5>
        <p>
        {t("privacy-policy.info-3-text", { lng: currentLanguage })}
        </p>
        </div>

        <div data-aos="fade-left" className={styles.card}>
        <h5>{t("privacy-policy.info-4", { lng: currentLanguage })}</h5>
        <p>
        {t("privacy-policy.info-4-text", { lng: currentLanguage })}
        </p>
        </div>

        <div data-aos="fade-left" className={styles.card}>
        <h5>{t("privacy-policy.info-5", { lng: currentLanguage })}</h5>
        <br />
        <p>
          <b>ProdElevate</b> {t("privacy-policy.info-5-text", { lng: currentLanguage })}
        </p>
        </div>

        <div data-aos="fade-left" className={styles.card}>
        <h5>{t("privacy-policy.info-6", { lng: currentLanguage })}</h5>
        <br />
        <p>
        {t("privacy-policy.info-6-text", { lng: currentLanguage })}
        </p>

        </div>
      </div>
    </div>
  );
};