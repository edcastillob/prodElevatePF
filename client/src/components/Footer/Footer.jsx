import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
        <div className={styles.divLeft}>
            <p>© {new Date().getFullYear()} ProdElevate. All Rights Reserved.</p>
        </div>
        <div className={styles.divRight}>
            <div className={styles.info}><Link to='/about' style={{textDecoration: "none"}}><p>About Us</p></Link></div>
            <div className={styles.info}><Link to='/privacy_policy' style={{textDecoration: "none"}}><p>Privacy Policy</p></Link></div>
            <div className={styles.info}><Link to='/terms_&_conditions' style={{textDecoration: "none"}}><p>Terms & Conditions</p></Link></div>
            <div className={styles.info}><Link to='/contact' style={{textDecoration: "none"}}><p>Contact Us</p></Link></div>
        </div>
    </footer>
  );
};

