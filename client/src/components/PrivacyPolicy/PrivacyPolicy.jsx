import React from "react";
import styles from "./PrivacyPolicy.module.css";
import { useTrail, animated } from "react-spring";

export const PrivacyPolicy = () => {
  const paragraphs = [
    "At prodElevate, the privacy of our users is a priority for us. This Privacy Policy describes how we collect, use, disclose, and protect the personal information you provide when using our platform prodElevate. By accessing and using our website and services, you agree to the practices described in this Privacy Policy.",
    "1. Information Collection: prodElevate will collect personal information provided by you during the registration process and while using our platform. This may include, among others, your name, email address, contact information, and payment details.",
    "2. Use of Information: We will use the collected information for the purpose of providing our services, processing your orders, sending important account-related notifications, and improving the user experience on prodElevate.",
    "3. Disclosure to Third Parties: We will not share, sell, or rent your personal information to third parties without your explicit consent, except when necessary to provide our services or comply with applicable laws.",
    "4. Information Security: We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or destruction.",
    "5. Cookies: prodElevate may use cookies and similar technologies to enhance your experience on our website and collect data for analysis and marketing purposes. By using our site, you agree to the use of cookies in accordance with our Cookie Policy.",
    "6. External Links: Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites.",
  ];

  const trail = useTrail(paragraphs.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>
      <div className={styles.infoContainer}>
        {trail.map((props, index) => (
          <animated.p key={index} style={props}>
            {paragraphs[index]}
          </animated.p>
        ))}
      </div>
    </div>
  );
};
