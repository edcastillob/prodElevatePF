import React from "react";
import photo from "../../assets/user.png";
import styles from "./ContactUs.module.css";

export const ContactUs = () => {

  return (
    <div className={styles.container}>
        <div className={styles.h1Contact}>
          <h2>Contact <b style={{color: "green" }}>The Team</b> of prodElevate</h2>
        </div>
        
        <div className={styles.contactContainer}>

          <div className={styles.sideColumns}>
            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Yonathan Acevedo</h6>
                <ul>
                  <li>GitHub</li>
                  <li>Red Social</li>
                  <li>Whatsapp?</li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={photo} alt="photo"></img>
              </div>
            </div>

            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Veralucía Mendoza</h6>
                <ul>
                  <li>GitHub</li>
                  <li>Red Social</li>
                  <li>Whatsapp?</li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={photo} alt="photo"></img>
              </div>
            </div>
          </div>

          <div className={styles.centerColumn}>
            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Edwar Castillo</h6>
                <ul>
                  <li>GitHub</li>
                  <li>Red Social</li>
                  <li>Whatsapp?</li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={photo} alt="photo"></img>
              </div>
            </div>

            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Luis Naveda</h6>
                <ul>
                  <li>GitHub</li>
                  <li>Red Social</li>
                  <li>Whatsapp?</li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={photo} alt="photo"></img>
              </div>
            </div>

            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>David Olivo</h6>
                <ul>
                  <li>GitHub</li>
                  <li>Red Social</li>
                  <li>Whatsapp?</li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={photo} alt="photo"></img>
              </div>
            </div>
          </div>

          <div className={styles.sideColumns}>
            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Paola Vargas</h6>
                <ul>
                  <li>GitHub</li>
                  <li>Red Social</li>
                  <li>Whatsapp?</li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={photo} alt="photo"></img>
              </div>
            </div>

            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Claudio Casagrande</h6>
                <ul>
                  <li>GitHub</li>
                  <li>Red Social</li>
                  <li>Whatsapp?</li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={photo} alt="photo"></img>
              </div>
            </div>
          </div>

        </div>

    </div>
  );
};