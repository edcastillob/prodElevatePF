import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Landing.module.css";
import logo from "../../assets/logo_2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import adidas from "../../assets/adidas.png";
import puma from "../../assets/puma.png";
import apple from "../../assets/apple.png";
import samsung from "../../assets/samsung.png";
import es from "../../assets/espana.png";
import en from "../../assets/estados-unidos.png";
import { useTranslation } from "react-i18next";


export const Landing = ({ handleLanguageChange, currentLanguage }) => {
  const [t, i18n] = useTranslation("global");
  //Lógica Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 


  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3, // Número de imágenes a mostrar por slide
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const companyLogos = [adidas, puma, apple, samsung];

  //Handle Dropdown
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo} alt="ProdElevate" />
        </div>
        <div className={styles.options}>
          <p className={styles.language} onClick={handleDropdownToggle}>{t("landing.language", { lng: currentLanguage })}</p>
          {isDropdownOpen && (
              <ul className={styles.dropdownOptions} style={{ zIndex: 10 }}>
                <li>
                    <h6 onClick={() => handleLanguageChange("es")} style={{display:'flex', gap:'5px'}}>
                    <img src={es} width={20} height={20} alt="Spanish"/>ES
                    </h6>
                </li>
                <li>
                    <h6 onClick={() => handleLanguageChange("en")} style={{display:'flex', gap:'5px'}}>
                    <img src={en} width={20} height={20} alt="English"/>EN
                    </h6>
                </li>
              </ul>
            )}



          <Link to="/usuario" className={styles.signUp}>
            <p>{t("landing.sign-up", { lng: currentLanguage })}</p>
          </Link>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.divLeft}>
          <h1 className={styles.title}>{t("landing.welcome-to-prodelevate", { lng: currentLanguage })}</h1>
          <h4 style={{ color: "#cacaca", fontFamily: "Poppins" }}>
            {t("landing.its-time-to", { lng: currentLanguage })}
          </h4>
          <div className={styles.item}>
            {/* <img src={check} alt="check" /> */}
            <span style={{ color: "white", fontSize:'20px' }}><ion-icon name="radio-button-on"></ion-icon></span>

            <p className={styles.description}>
              {t("landing.line1", { lng: currentLanguage })}
            </p>
          </div>
          <div className={styles.item}>
            {/* <img src={check} alt="check" /> */}
            <span style={{ color: "white", fontSize:'20px' }}><ion-icon name="radio-button-on"></ion-icon></span>
            <p className={styles.description}>
              {t("landing.line2", { lng: currentLanguage })}
            </p>
          </div>
          <div className={styles.item}>
            {/* <img src={check} alt="check" /> */}

            <span style={{ color: "white", fontSize:'20px' }}><ion-icon name="radio-button-on"></ion-icon></span>
            <p className={styles.description} style={{ marginTop: "1rem" }}>
              {t("landing.line3", { lng: currentLanguage })}
            </p>
          </div>
          <Link to="/home" className={styles.button}>
            <div>
              <span>{t("landing.get-started", { lng: currentLanguage })}</span>
            </div>
          </Link>
        </div>
        <div className={styles.reel}>
          <h4 className={styles.titleReel}>{t("landing.companies", { lng: currentLanguage })}</h4>
          <div className={styles.companies}>
            <Slider {...carouselSettings}>
              {companyLogos.map((logo, index) => (
                <div className={styles.companie} key={index}>
                  <img src={logo} alt={`Company Logo ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
