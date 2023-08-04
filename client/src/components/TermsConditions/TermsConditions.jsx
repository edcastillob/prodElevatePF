import React from "react";
import { useSpring, animated, config } from 'react-spring';
import styles from "./TermsConditions.module.css";

export const TermsConditions = () => {
  const introAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, config: config.slow });
  const sectionAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, config: config.slow, delay: 400 });

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <main className={styles.main}>
          <animated.section className={styles.intro} style={introAnimation}>
            <h2>Terms & Conditions</h2>
          </animated.section>
          <animated.section className={styles.TermsConditions} style={sectionAnimation}>
            <h2>1. ACCEPTABLE USE</h2>
            <div className={styles.TermsConditions}>
              <p>
                You agree to use <b>prodElevate</b> solely for lawful purposes and in accordance with applicable laws and regulations.
                It is not permitted to use our website in a way that may damage, disable, overload, or compromise its operation.
              </p>
            </div>
            <h2>2. INTELLECTUAL PROPERTY</h2>
            <div className={styles.TermsConditions}>
              <p>
                All content present on <b>prodElevate</b>, including but not limited to logos, text, graphics, images, and software,
                is protected by intellectual property rights and belongs to <b>prodElevate Company</b>. You agree not to copy, distribute,
                reproduce, or create derivative works from such content without our explicit consent.
              </p>
            </div>
            <h2>3. LIABILITY</h2>
            <div className={styles.TermsConditions}>
              <p>
                <b>prodElevate</b> shall not be liable for any direct, indirect, incidental, consequential, or special damages that
                may arise from the use or inability to use our website or services.
              </p>
            </div>
            <h2>4. MODIFICATIONS</h2>
            <div className={styles.TermsConditions}>
              <p>
                We reserve the right to modify, suspend, or discontinue any aspect of <b>prodElevate</b> at any time without prior notice.
              </p>
            </div>
            <h2>5. APPLICABLE LAW</h2>
            <div className={styles.TermsConditions}>
              <p>
                These terms and conditions are governed by the laws of State, and any dispute arising in connection with these terms and
                conditions shall be subject to the exclusive jurisdiction of the courts of State.
              </p>
            </div>
          </animated.section>
        </main>
      </div>
    </div>
  );
};
