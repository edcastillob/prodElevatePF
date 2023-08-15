import React, { useEffect } from 'react';
import styles from "./TermsConditions.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

export const TermsConditions = ({ currentLanguage }) => {
  const { t } = useTranslation('global');
  useEffect(() => {
    AOS.init({
      
    });
  }, []);

  return (
      <div className={styles.container}>
        <h1>{t("terms.terms", { lng: currentLanguage })}</h1>
        <div className={styles.subtitle}>
          <h6 data-aos="fade-up">
          {t("terms.text-1", { lng: currentLanguage })} <b>ProdElevate</b>. {t("terms.text-2", { lng: currentLanguage })}
          </h6>
        </div>
        <div className={styles.infoCards}>
          <div data-aos="fade-left" className={styles.card}>
          <h5>{t("terms.info-1", { lng: currentLanguage })}</h5>
          <p>
          {t("terms.info-1-text", { lng: currentLanguage })} <b>ProdElevate</b> {t("terms.info-1-text-2", { lng: currentLanguage })}
          </p>
          </div>
    
          <div data-aos="fade-left" className={styles.card}>
          <h5>{t("terms.info-2", { lng: currentLanguage })}</h5>
          <p>
          {t("terms.info-2-text", { lng: currentLanguage })} <b>ProdElevate</b>, {t("terms.info-2-text-2", { lng: currentLanguage })} <b>ProdElevate</b>. {t("terms.info-2-text-3", { lng: currentLanguage })}
          </p>
          </div>
    
          <div data-aos="fade-left" className={styles.card}>
          <h5>{t("terms.info-3", { lng: currentLanguage })}</h5>
          <p>
          <b>ProdElevate</b> {t("terms.info-3-text", { lng: currentLanguage })}
          </p>
          </div>
    
          <div data-aos="fade-left" className={styles.card}>
          <h5>{t("terms.info-4", { lng: currentLanguage })}</h5>
          <p>
          {t("terms.info-4-text", { lng: currentLanguage })} <b>ProdElevate</b> {t("terms.info-4-text-2", { lng: currentLanguage })}
          </p>
          </div>
    
          <div data-aos="fade-left" className={styles.card}>
          <h5>{t("terms.info-5", { lng: currentLanguage })}</h5>
          <p>
          {t("terms.info-5-text", { lng: currentLanguage })}
          </p>
          </div>
        </div>
      </div>
    );
};


// (
//   <div className={styles.container}>
//     <h1>Terms & Conditions</h1>
//     <div className={styles.infoContainer}>
//       <p>
//         Welcome to <b>prodElevate</b>. By accessing and using our platform, you agree to comply with the following terms 
//         and conditions:
//       </p>

//       <h4>1. Acceptable Use:</h4>
//       <p>
//         You agree to use <b>prodElevate</b> solely for lawful purposes and in accordance with applicable laws and regulations. 
//         It is not permitted to use our website in a way that may damage, disable, overload, or compromise its operation.
//       </p>

//       <h4>2. Intellectual Property:</h4>
//       <p>
//         All content present on <b>prodElevate</b>, including but not limited to logos, text, graphics, images, and software, 
//         is protected by intellectual property rights and belongs to <b>prodElevate Company</b>. You agree not to copy, distribute, 
//         reproduce, or create derivative works from such content without our explicit consent.
//       </p>

//       <h4>3. Liability:</h4>
//       <p>
//         <b>prodElevate</b> shall not be liable for any direct, indirect, incidental, consequential, or special damages that 
//         may arise from the use or inability to use our website or services.
//       </p>

//       <h4>4. Modifications:</h4>
//       <p>
//         We reserve the right to modify, suspend, or discontinue any aspect of <b>prodElevate</b> at any time without prior notice.
//       </p>

//       <h4>5. Applicable Law:</h4>
//       <p>
//         These terms and conditions are governed by the laws of State, and any dispute arising in connection with these terms and 
//         conditions shall be subject to the exclusive jurisdiction of the courts of State.
//       </p>
//     </div>
//   </div>
// );