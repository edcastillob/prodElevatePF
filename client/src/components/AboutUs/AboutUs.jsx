import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from "../../assets/logo_2.png";
import imageTeamWork from "../../assets/prodElevate Image About Us.png"
import styles from './AboutUs.module.css';
import 'boxicons/css/boxicons.min.css';
import imagen1 from '../../assets/reunion.jpg';
import imagen2 from '../../assets/createProductBG.jpg';
import imagen3 from '../../assets/imagen3.jpg';
import imagen4 from '../../assets/imagen4.jpg';
import edwar from '../../assets/Edwar.jpg';
import luis from '../../assets/Luis.jpg';
import yonathan from '../../assets/Yonathan.jpg';
import david from '../../assets/David.jpg';
import vera from '../../assets/Veralucia.jpg';
import claudio from '../../assets/Claudio.jpg';
import paola from '../../assets/Paola.jpg';
import { useTranslation } from 'react-i18next';


export const AboutUs = ({ currentLanguage }) => {
    const { t } = useTranslation('global');
    useEffect(() => {
        AOS.init({
          
        });
      }, []);

  return (
    <div className={styles.container}>
        {/*  */}
        <h2 style={{fontFamily:'Poppins', marginBottom:'2rem'}}>{t("about.about-us", { lng: currentLanguage })}</h2>
        <div className={styles.evento}>
			<div data-aos="fade-right" className={styles.foto}>
				<img src={imagen1} alt="Imagen 1"/>
			</div>
            <div data-aos="zoom-in" className={styles.content}>
			    <h3 className={styles.title}>{t("about.who-are-we", { lng: currentLanguage })}</h3>

            <p>{t("about.text-1", { lng: currentLanguage })} </p>

            </div>
		</div>
        <div className={styles.evento}>
			<div data-aos="zoom-in" className={styles.content}>
			    <h3 className={styles.title}>{t("about.our-mission", { lng: currentLanguage })}</h3>

            <p><b>ProdElevate</b> {t("about.text-2", { lng: currentLanguage })}.</p>

            </div>
			<div data-aos="fade-left" className={styles.foto}>
                <img src={imagen3} alt="Imagen 3" />
			</div>
		</div>

		<div className={styles.evento}>
			<div data-aos="fade-right" className={styles.foto}>
                <img src={imagen4} alt="Imagen 2"/>
			</div>
			<div data-aos="zoom-in" className={styles.content}>
			    <h3 className={styles.title}>{t("about.our-goal", { lng: currentLanguage })}</h3>

            <p>{t("about.text-3-1", { lng: currentLanguage })} <b>ProdElevate</b> {t("about.text-3-2", { lng: currentLanguage })}</p>

            </div>
		</div>

        <h2 data-aos="fade-up" className={styles.teamTitle}>Meet our Team</h2>
        <p data-aos="fade-up">{t("about.our-team-phrase", { lng: currentLanguage })}</p>


		<div className={styles.team}>
            <div data-aos="fade-up-left" className={styles.person}>
                <div className={styles.divImg}>
                    <img src={edwar} alt="Edwar Castillo" />
                </div>
                <div className={styles.data}>
                    <h6 className={styles.name}>Edwar Castillo</h6>
                    <p className={styles.country}>Venezuela</p>
                    <div className={styles.social}>
                       
                        <a href="https://www.linkedin.com/in/edcastillob" target="_blank"><i class='bx bxl-linkedin'></i>
                        </a>
                        <a href="https://github.com/edcastillob/" target="_blank"><i class='bx bxl-github' ></i>
                        </a>
                       
                    </div>
                    <div className={styles.email}>
                    <span><i class='bx bxl-gmail'></i></span>
                        <p>edwar.castillo@gmail.com</p>
                    </div>
                </div>
            </div>


            <div data-aos="fade-up-left" className={styles.person}>
            <div className={styles.divImg}>
                    <img src={luis} alt="Luis Naveda" />
                </div>
                <div className={styles.data}>
                    <h6 className={styles.name}>Luis Naveda</h6>
                    <p className={styles.country}>Argentina</p>
                    <div className={styles.social}>
                       
                        <a href="https://www.linkedin.com/in/luisnavedag" target="_blank"><i class='bx bxl-linkedin'></i>
                        </a>
                        <a href="https://github.com/luisnavedag/" target="_blank"><i class='bx bxl-github' ></i>
                        </a>
                       
                    </div>
                    <div className={styles.email}>
                    <span><i class='bx bxl-gmail'></i></span>
                        <p>luisnaveda10@gmail.com</p>
                    </div>
                </div>
            </div>


            <div data-aos="fade-up-left" className={styles.person}>
            <div className={styles.divImg}>
                    <img src={yonathan} alt="Yonathan Acevedo" />
                </div>
                <div className={styles.data}>
                    <h6 className={styles.name}>Yonathan Acevedo</h6>
                    <p className={styles.country}>{t("about.dominican", { lng: currentLanguage })}</p>
                    <div className={styles.social}>
                       
                        <a href="https://www.linkedin.com/in/yonathan-acevedo-baez-26a453b4/" target="_blank"><i class='bx bxl-linkedin'></i>
                        </a>
                        <a href="https://github.com/yonathanbaez25/" target="_blank"><i class='bx bxl-github' ></i>
                        </a>
                       
                    </div>
                    <div className={styles.email}>
                    <span><i class='bx bxl-gmail'></i></span>
                        <p>yacevedo170@gmail.com</p>
                    </div>
                </div>
            </div>
            
            <div data-aos="fade-up-left" className={styles.person}>
            <div className={styles.divImg}>
                    <img src={david} alt="David Olivo" />
                </div>
                <div className={styles.data}>
                    <h6 className={styles.name}>David Olivo</h6>
                    <p className={styles.country}>Argentina</p>
                    <div className={styles.social}>
                       
                        <a href="https://www.linkedin.com/in/david-olivo-rodr%C3%ADguez-401412239/" target="_blank"><i class='bx bxl-linkedin'></i>
                        </a>
                        <a href="https://github.com/Davidoar15/" target="_blank"><i class='bx bxl-github' ></i>
                        </a>
                       
                    </div>
                    <div className={styles.email}>
                    <span><i class='bx bxl-gmail'></i></span>
                        <p>davidoar15@gmail.com</p>
                    </div>
                </div>
            </div>


            <div data-aos="fade-up-left" className={styles.person}>
            <div className={styles.divImg}>
                    <img src={vera} alt="Veralucía Mendoza" />
                </div>
                <div className={styles.data}>
                    <h6 className={styles.name}>Veralucía Mendoza</h6>
                    <p className={styles.country}>Perú</p>
                    <div className={styles.social}>
                       
                        <a href="https://www.linkedin.com/in/veraluciamendozamejia" target="_blank"><i class='bx bxl-linkedin'></i>
                        </a>
                        <a href="https://github.com/VeraluciaMendoza/" target="_blank"><i class='bx bxl-github' ></i>
                        </a>
                       
                    </div>
                    <div className={styles.email}>
                    <span><i class='bx bxl-gmail'></i></span>
                        <p>mendozaveralucia@gmail.com</p>
                    </div>
                </div>
            </div>

            <div data-aos="fade-up-left" className={styles.person}>
            <div className={styles.divImg}>
                    <img src={claudio} alt="Claudio Casagrande" />
                </div>
                <div className={styles.data}>
                    <h6 className={styles.name}>Claudio Casagrande</h6>
                    <p className={styles.country}>Argentina</p>
                    <div className={styles.social}>
                       
                        <a href="https://www.linkedin.com/in/claudio-david-casagrande-bethouart-27839524b" target="_blank"><i class='bx bxl-linkedin'></i>
                        </a>
                        <a href="https://github.com/Taio45678" target="_blank"><i class='bx bxl-github' ></i>
                        </a>
                       
                    </div>
                    <div className={styles.email}>
                    <span><i class='bx bxl-gmail'></i></span>
                        <p>claudiodavid339@gmail.com</p>
                    </div>
                </div>
            </div>

            <div data-aos="fade-up-left" className={styles.person}>
            <div className={styles.divImg}>
                    <img src={paola} alt="Paola Vargas" />
                </div>
                <div className={styles.data}>
                    <h6 className={styles.name}>Paola Vargas</h6>
                    <p className={styles.country}>Argentina</p>
                    <div className={styles.social}>
                       
                        <a href="https://www.linkedin.com/in/paola-vargas-soria" target="_blank"><i class='bx bxl-linkedin'></i>
                        </a>
                        <a href="https://github.com/pvargas90" target="_blank"><i class='bx bxl-github' ></i>
                        </a>
                       
                    </div>
                    <div className={styles.email}>
                    <span><i class='bx bxl-gmail'></i></span>
                        <p>paolan.vargass@gmail.com
</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};

/*
    Somos un Equipo especializado en ofrecer soluciones sencillas pero efectivas para las personas.
    Nos preocupamos por la comodidad y seguridad de nuestros clientes y tenemos todos los focos puestos 
    con ese objetivo. Tenemos experiencia en la creacion de este tipo de productos y la confianza para 
    aportar algo mas que una pagina web...
*/


{/* <div classNameName={styles.h2Container}>
            <h2>About Us</h2>
        </div>

        <div className={styles.cardsContainer}>
            <div className={styles.imagesContainer}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Logo"/>
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
            </div>

            <div className={styles.aboutContainer}>
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
            </div>
        </div> */}