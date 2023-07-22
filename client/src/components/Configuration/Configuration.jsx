import React from 'react';
import styles from './Configuration.module.css';
import config from '../../assets/config_logo.png';
import { Link } from 'react-router-dom';


export const Configuration = () =>{

    return(
        <div className={styles.container}>
            <div className={styles.upDiv}>
                <div className={styles.title}>
                    <img src={config} alt="logo" className={styles.logo} /> 
                    <h3>Settings</h3>
                </div>
            <div className={styles.divOptions}>
                <div className={styles.item}>
                <Link to='/producto' className={styles.link}>
                    <h1 style={{ color: '#9EA3AD' }}><ion-icon name="basket"></ion-icon></h1>
                    <h4>Create Product</h4>
                </Link>
                </div>
                <div className={styles.item}>
                <Link to='/categoria' className={styles.link}>
                    <h1 style={{color: '#9EA3AD'}}><ion-icon name="grid"></ion-icon></h1>
                    <h4>Create Category</h4>
                </Link>
                </div>
                <div className={styles.item}>
                <Link to='/proveedor' className={styles.link}>
                    <h1 style={{color: '#9EA3AD'}}><ion-icon name="contacts"></ion-icon></h1>
                    <h4>Create Provider</h4>
                </Link>    
                </div>
            </div>
            </div>
            <div className={styles.downDiv}>
                <div className={styles.title}>
                <h1 style={{color: '#267cb5', fontSize:'4rem'}}><ion-icon name="contact"></ion-icon></h1>
                <h3>User</h3>
            </div>
                <div className={styles.divOptions}>
                <div className={styles.item}>
                <Link to='/usuario' className={styles.link}>    
                    <h1 style={{color: '#9EA3AD'}}><ion-icon name="person-add"></ion-icon></h1>
                    <h4>New User</h4>
                </Link>
                </div>
                <div className={styles.item}>
                    <h1 style={{color: '#9EA3AD'}}><ion-icon name="body"></ion-icon></h1>
                    <h4>Assign Role</h4>
                </div>
                </div>
            </div>
        </div>
    )
}