import React, { useState } from "react";
import styles from "./ContactUs.module.css"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';

export const ContactUs = ({ currentLanguage }) => { 
  const { t } = useTranslation('global');

  return (
    <div className={styles.container}>
          <form
            action="https://formspree.io/f/xnqkpnga"
            method="POST"
            className={styles.formContainer}
          >
            <div className={styles.divTitle}>
              <h4>{t("contact.contact-us", { lng: currentLanguage })}</h4>
            </div>

            <div className={styles.divInput}>
            <label>
              
              <input 
              type="email" 
              name="email"
              placeholder={t("contact.email", { lng: currentLanguage })} 
              className="form-control mb-4 w-100"/>
            </label>
            <label>
              
              <textarea 
              className="form-control mb-4 w-100" 
              name="message"
              placeholder={t("contact.message", { lng: currentLanguage })}
              style={{resize:'none'}}>

              </textarea>
            </label>

            </div>
            <div className={styles.divBtn}>
              <button 
              type="submit"
              className={styles.create}
              >{t("contact.send", { lng: currentLanguage })}
              </button>

            </div>
          </form>

    </div>
  );
};