import React from "react";
import styles from "./PrivacyPolicy.module.css"

export const PrivacyPolicy = () => {

  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>
      <div className={styles.infoContainer}>
        <p>
          At <b>prodElevate</b>, the privacy of our users is a priority for us. This Privacy Policy describes how we collect, 
          use, disclose, and protect the personal information you provide when using our platform <b>prodElevate</b>. By accessing 
          and using our website and services, you agree to the practices described in this Privacy Policy.
        </p>

        <h4>1. Information Collection:</h4>
        <p>
          <b>prodElevate</b> will collect personal information provided by you during the registration process and while using our 
          platform. This may include, among others, your name, email address, contact information, and payment details.
        </p>

        <h4>2. Use of Information:</h4>
        <p>
          We will use the collected information for the purpose of providing our services, processing your orders, sending important 
          account-related notifications, and improving the user experience on <b>prodElevate</b>.
        </p>

        <h4>3. Disclosure to Third Parties:</h4>
        <p>
          We will not share, sell, or rent your personal information to third parties without your explicit consent, except when necessary 
          to provide our services or comply with applicable laws.
        </p>

        <h4>4. Information Security:</h4>
        <p>
          We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or 
          destruction.
        </p>

        <h4>5. Cookies:</h4>
        <p>
          <b>prodElevate</b> may use cookies and similar technologies to enhance your experience on our website and collect data for analysis 
          and marketing purposes. By using our site, you agree to the use of cookies in accordance with our Cookie Policy.
        </p>

        <h4>6. External Links:</h4>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites.
        </p>
      </div>
    </div>
  );
};