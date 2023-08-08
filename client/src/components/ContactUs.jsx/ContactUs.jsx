import React  from "react";
import photo from "../../assets/user.png";
import yona from "../../assets/Yonathan.jpg";
import vera from "../../assets/Veralucia.jpg";
import edwar from "../../assets/Edwar.jpg";
import luis from "../../assets/Luis.jpg";
import paola from "../../assets/Paola.jpg";
import claudio from "../../assets/Claudio.jpg";
import david from "../../assets/David.jpg";
import styles from "./ContactUs.module.css";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";


export const ContactUs = () => {
 
  const fadeProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 280, friction: 200 },
  });
  const handleOpenInNewTab = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null;
      newWindow.location = url;
    }
  };
  return (
    <animated.div style={fadeProps} className={styles.container}>
      
        <div className={styles.h2Contact}>
          <h2>Contact <b style={{color: "green" }}>The Team</b> of prodElevate</h2>
        </div>
        
        <div className={styles.contactContainer}>
        
          <div className={styles.sideColumns}>
            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Yonathan Acevedo</h6>
                <ul>
                  <li>Dominican Republic</li>
                  <li>yacevedo170@gmail.com</li>
                  <li>
                  <span className={styles.contactSpan}
                    onClick={() =>
                      handleOpenInNewTab(
                        "https://www.linkedin.com/in/yonathan-acevedo-baez-26a453b4"
                      )
                    }
                  >
                    LinkedIn
                  </span>
                  </li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={yona} alt="photo"></img>
              </div>
            </div>

            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Veralucía Mendoza</h6>
                <ul>
                  <li>Peru</li>
                  <li>mendozaveralucia@gmail.com</li>
                  <li>
                  <span className={styles.contactSpan}
                    onClick={() =>
                      handleOpenInNewTab(
                        "https://www.linkedin.com/in/veraluciamendozamejia"
                      )
                    }
                  >
                    LinkedIn
                  </span>
                  </li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={vera} alt="photo"></img>
              </div>
            </div>
          </div>

          <div className={styles.centerColumn}>
            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Edwar Castillo</h6>
                <ul>
                  <li>Venezuela</li>
                  <li>edwar.castillo@gmail.com</li>
                  <li>
                  <span className={styles.contactSpan}
                    onClick={() =>
                      handleOpenInNewTab(
                        "https://www.linkedin.com/in/edcastillob"
                      )
                    }
                  >
                    LinkedIn
                  </span>
                  </li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={edwar} alt="photo"></img>
              </div>
            </div>

            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Luis Naveda</h6>
                <ul>
                  <li>Argentina</li>
                  <li>luisnaveda10@gmail.com</li>
                  <li>
                  <span className={styles.contactSpan}
                    onClick={() =>
                      handleOpenInNewTab(
                        "https://www.linkedin.com/in/luisnavedag"
                      )
                    }
                  >
                    LinkedIn
                  </span>
                  </li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={luis} alt="photo"></img>
              </div>
            </div>

            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>David Olivo</h6>
                <ul>
                  <li>Argentina</li>
                  <li>davidoar15@gmail.com</li>
                  <li>
                  <span className={styles.contactSpan}
                    onClick={() =>
                      handleOpenInNewTab(
                        "https://www.linkedin.com/in/david-olivo-rodr%C3%ADguez-401412239/"
                      )
                    }
                  >
                    LinkedIn
                  </span>
                  </li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={david} alt="photo"></img>
              </div>
            </div>
          </div>

          <div className={styles.sideColumns}>
            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Paola Vargas</h6>
                <ul>
                  <li>Argentina</li>
                  <li>paolan.vargass@gmail.com</li>
                  <li>
                  <span className={styles.contactSpan}
                    onClick={() =>
                      handleOpenInNewTab(
                        "https://www.linkedin.com/in/paola-vargas-soria"
                      )
                    }
                  >
                    LinkedIn
                  </span>
                  </li>
                </ul>
              </div>
              <div className={styles.photo}>
                <img src={paola} alt="photo"></img>
              </div>
            </div>

            <div className={styles.person}>
              <div className={styles.info}>
                <h6 style={{color: "green"}}>Claudio Casagrande</h6>
                <ul>
                  <li>Argentina</li>
                  <li>claudiodavid339@gmail.com</li>
                  <li>
                  <span className={styles.contactSpan}
                    onClick={() =>
                      handleOpenInNewTab(
                        "https://www.linkedin.com/in/claudio-david-casagrande-bethouart-27839524b"
                      )
                    }
                  >
                    LinkedIn
                  </span>
                  </li>
                </ul>
              </div>
              
              <div className={styles.photo}>
                <img src={claudio} alt="photo"></img>
              </div>
            </div>
            
          </div>
         
        </div>

        </animated.div>
  );
};