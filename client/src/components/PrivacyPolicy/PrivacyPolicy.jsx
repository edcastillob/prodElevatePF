import React from "react";
import { useSpring, animated, config } from 'react-spring';
import styles from "./PrivacyPolicy.module.css";

export const PrivacyPolicy = () => {
  const introAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, config: config.slow });
  const policySectionAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, config: config.slow, delay: 400 });

  return (
    <div className={styles.container}>
      
      <div className={styles.container2}>
        <main className={styles.main}>
          <animated.section className={styles.intro} style={introAnimation}>
            <h2>Privacy Policy</h2>
            <p>
              At <b>prodElevate</b>, the privacy of our users is a priority for us. This Privacy Policy describes how we collect, 
              use, disclose, and protect the personal information you provide when using our platform <b>prodElevate</b>. By accessing
              and using our website and services, you agree to the practices described in this Privacy Policy.
            </p>
          </animated.section>
          <animated.section className={styles.PrivacyPolicyGral} style={policySectionAnimation}>
            <h2>INFORMATION COLLECTION</h2>
            <div className={styles.PrivacyPolicy}>
              <p> <b>ProdElevate</b> is a product management and sales administration system for online sales.
                              The main objective is to provide users with a platform where they can efficiently create, 
                              manage, and sell products.</p>
            </div>
            <h2>USE OF INFORMATION</h2>
            <div className={styles.PrivacyPolicy}>
              <p>
                We will use the collected information for the purpose of providing our services, processing your orders, sending important 
                account-related notifications, and improving the user experience on <b>prodElevate</b>.
              </p>
            </div>
            <h2>DISCLOSURE TO THIRD PARTIES</h2>
            <div className={styles.PrivacyPolicy}>
              <p> We will not share, sell, or rent your personal information to third parties without your explicit consent, except when necessary 
                to provide our services or comply with applicable laws.
              </p>
            </div>
            <h2>INFORMATION SECURITY</h2>
            <div className={styles.PrivacyPolicy}>
              <p>  We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or 
                destruction. </p>
            </div>
            <h2>COOKIES</h2>
            <div className={styles.PrivacyPolicy}>
              <p> <b>prodElevate</b> may use cookies and similar technologies to enhance your experience on our website and collect data for analysis 
                and marketing purposes. By using our site, you agree to the use of cookies in accordance with our Cookie Policy. </p>
            </div>
            <h2>EXTERNAL LINKS</h2>
            <div className={styles.PrivacyPolicy}>
              <p> Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites. </p>
            </div>
          </animated.section>
        </main>
      </div>
    </div>
  );
};
