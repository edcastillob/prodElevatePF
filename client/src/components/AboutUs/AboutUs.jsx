import React from "react";
import { useSpring, animated } from "react-spring";
import logo from "../../assets/logo_2.png";
import imageTeamWork from "../../assets/prodElevate Image About Us.png";
import styles from "./AboutUs.module.css";
export const AboutUs = () => {
  const infoContainerAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 500 },
  });

  return (
    <div className={styles.container}>
      <div className={styles.h2Container}>
        <h2>About Us</h2>
      </div>

      <div className={styles.cardsContainer}>
        <animated.div style={infoContainerAnimation} className={styles.imagesContainer}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Logo" />
          </div>

          <div className={styles.ourContainer}>
            <div className={styles.infoContainer}>
              <h2>WHO ARE WE?</h2>
              <p>
                We're a specialized <b>Team</b> offering simple yet highly effective solutions. Our focus is on
                ensuring the comfort and security of our clients. With extensive experience in developing
                such products, we go beyond just a website...
              </p>
            </div>
          </div>
        </animated.div>
            <div><img src={logo} alt="" /></div>
        <animated.div style={infoContainerAnimation} className={styles.aboutContainer}>
          <div className={styles.ourContainer}>
            <div className={styles.infoContainer}>
              <h2>OUR MISSION</h2>
              <p>
                <b>prodElevate</b> is a product management and sales administration system for online sales.
                The main objective is to provide users with a platform where they can efficiently create,
                manage, and sell products.
              </p>
              <h2>OUR GOAL</h2>
              <p>
                We aim to provide a fast, versatile, and secure service for all types of
                clients who find in <b>prodElevate</b> what they need to boost and manage their business. Our ultimate
                goal is to continue growing alongside our clients and further refine the platform for their comfort.
              </p>
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
};
