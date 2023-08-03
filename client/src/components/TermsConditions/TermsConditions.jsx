import React from "react";
import styles from "./TermsConditions.module.css";
import { useTrail, animated } from "react-spring";

export const TermsConditions = () => {
  const paragraphs = [
    "Welcome to prodElevate. By accessing and using our platform, you agree to comply with the following terms and conditions:",
    "1. Acceptable Use: You agree to use prodElevate solely for lawful purposes and in accordance with applicable laws and regulations. It is not permitted to use our website in a way that may damage, disable, overload, or compromise its operation.",
    "2. Intellectual Property: All content present on prodElevate, including but not limited to logos, text, graphics, images, and software, is protected by intellectual property rights and belongs to prodElevate Company. You agree not to copy, distribute, reproduce, or create derivative works from such content without our explicit consent.",
    "3. Liability: prodElevate shall not be liable for any direct, indirect, incidental, consequential, or special damages that may arise from the use or inability to use our website or services.",
    "4. Modifications: We reserve the right to modify, suspend, or discontinue any aspect of prodElevate at any time without prior notice.",
    "5. Applicable Law: These terms and conditions are governed by the laws of State, and any dispute arising in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts of State.",
  ];

  const trail = useTrail(paragraphs.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <div className={styles.container}>
      <h1>Terms & Conditions</h1>
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
