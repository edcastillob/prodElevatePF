import React from "react";
import logo from "../../assets/logo_2.png";
import imageTeamWork from "../../assets/prodElevate Image About Us.png"
import styles from './AboutUs.module.css';

export const AboutUs = () => {

  return (
    <div className={styles.container}>

        <div className={styles.aboutContainer}>
            <div className={styles.ourContainer}>
                <h3>About Us</h3>
                <div className={styles.infoContainer}>
                    <h2>OUR MISSION</h2>
                    <p>
                        <b>prodElevate</b> is a product management and sales administration system for online sales.
                        The main objective is to provide users with a platform where they can efficiently create, 
                        manage, and sell products.
                    </p>
                </div>
            </div>

            <div className={styles.ourContainer}>
                <div className={styles.infoContainer}>
                    <h2>OUR GOAL</h2>
                    <p>
                        We aim to provide a fast, versatile, and secure service for all types of 
                        clients who find in <b>prodElevate</b> what they need to boost and manage their business. Our ultimate 
                        goal is to continue growing alongside our clients and further refine the platform for their comfort.
                    </p>
                </div>
            </div>
        </div>

        <div className={styles.imagesContainer}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo"/>
            </div>

            <div className={styles.imgContainer}>
                <img src={imageTeamWork} alt="imageTeamWork"/>
            </div>
        </div>
        
    </div>
  );
};