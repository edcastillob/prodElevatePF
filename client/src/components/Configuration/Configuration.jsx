import React, { useRef, useState } from 'react';
import styles from './Configuration.module.css';
import config from '../../assets/config_logo.png';
import { Link } from 'react-router-dom';
import { Provider } from '../Product/provider/Provider'
import { Category } from '../Product/category/Category';
import { Product } from '../Product/createProduct/Product';
import { ProvidersAll } from "../Product/provider/ProvidersAll/ProvidersAll";
import { EditProvider } from '../Product/provider/EditProvider/EditProvider';
import { SettingsProduct } from '../Product/SettingsProduct/SettingProduct';
import { ShowCategory } from '../Product/category/ShowCategory/ShowCategory';
import { UsersAll } from '../users/UsersAll/UsersAll';
import { CreateUser } from '../users/createUser/CreateUser';
import logo from '../../assets/logo_2.png'


export const Configuration = () =>{
  // Dropdown states
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);


   

  // Component selection states
  const [selectedProviderComponent, setSelectedProviderComponent] = useState(null);
  const [selectedProductComponent, setSelectedProductComponent] = useState(null);
  const [selectedCategoryComponent, setSelectedCategoryComponent] = useState(null);
  const [selectedUserComponent, setSelectedUserComponent] = useState(null);

  const [componentSelected, setComponentSelected] = useState(false);
  

  // Refs for dropdown containers
  const providerDropdownRef = useRef(null);
  const productDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const userDropdownRef = useRef(null)


  // Handle Provider option click
  const handleProviderOptionClick = (component) => {
    setSelectedProviderComponent(component);
    setIsProviderDropdownOpen(false);
    setComponentSelected(true);

    // Resetear el estado de las otras opciones seleccionadas
    setSelectedProductComponent(null);
    setSelectedCategoryComponent(null);
    setSelectedUserComponent(null);
  };

  // Handle Product option click
  const handleProductOptionClick = (component) => {
    setSelectedProductComponent(component);
    setIsProductDropdownOpen(false);
    setComponentSelected(true);

    // Resetear el estado de las otras opciones seleccionadas
    setSelectedProviderComponent(null);
    setSelectedCategoryComponent(null);
    setSelectedUserComponent(null);
  };

  // Handle Category option click
  const handleCategoryOptionClick = (component) => {
    setSelectedCategoryComponent(component);
    setIsCategoryDropdownOpen(false);
    setComponentSelected(true);

    // Resetear el estado de las otras opciones seleccionadas
    setSelectedProviderComponent(null);
    setSelectedProductComponent(null);
    setSelectedUserComponent(null);
  };

  // Handle User option click
  const handleUserOptionClick = (component) => {
    setSelectedUserComponent(component);
    setIsUserDropdownOpen(false);
    setComponentSelected(true);

    // Resetear el estado de las otras opciones seleccionadas
    setSelectedProviderComponent(null);
    setSelectedProductComponent(null);
    setSelectedCategoryComponent(null);

  };

 


    return(
        <div className={styles.container}>
            <div className={styles.title}>
                
                <h4><span style={{fontSize:'2.5rem', marginTop:'10px', color:'#000924'}}><ion-icon name="settings"></ion-icon></span>  Settings</h4>
            </div>
            <div className={styles.content}>
            <div className={styles.sidebar}>

            {/* PRODUCT */}
            <div className={styles.optionContainer}>
            <div className={styles.options}  onClick={() => handleProductOptionClick('Products')}>
            <span style={{fontSize:'2.4rem', marginRight:'0.5rem'}}><ion-icon name="basket"></ion-icon></span>Product
            </div>
            <div className={styles.dropdownOption}
            onClick={() => handleProductOptionClick('Create Product')}>
                  <ion-icon name="add"></ion-icon>Create Product
            </div>
          </div>

            {/* PROVIDER */}
          <div className={styles.optionContainer}>
            <div className={styles.options}  onClick={() => handleProviderOptionClick('Providers')}>
            <span style={{fontSize:'2.4rem', marginRight:'0.5rem'}}><ion-icon name="contacts"></ion-icon></span>Provider
            </div>
            <div className={styles.dropdownOption}
            onClick={() => handleProviderOptionClick('Create Provider')}>
                  <ion-icon name="add"></ion-icon>Create Provider
            </div>

          </div>

            {/* CATEGORY */}
          <div className={styles.optionContainer}>
            <div className={styles.options}  onClick={() => handleCategoryOptionClick('Category')}>
            <span style={{fontSize:'2.4rem', marginRight:'0.5rem'}}><ion-icon name="apps"></ion-icon></span>Category
            </div>
            <div className={styles.dropdownOption}
            onClick={() => handleCategoryOptionClick('Create Category')}>
                  <ion-icon name="add"></ion-icon>Create Category
            </div>
          </div>

              {/* USER */}
          <div className={styles.optionContainer}>
            <div className={styles.options} onClick={() => handleUserOptionClick('User')}>
            <span style={{fontSize:'2.4rem', marginRight:'0.5rem'}}><ion-icon name="contact"></ion-icon></span>User
            </div>
            <div className={styles.dropdownOption}
            onClick={() => handleUserOptionClick('Create User')}>
                  <ion-icon name="add"></ion-icon>Create User
            </div>
          </div>

          

        </div>

             


                  
            <div className={styles.components}>
            {componentSelected ? (
    <>
      {/* PRODUCT COMPONENTS */}
      {selectedProductComponent === 'Products' && <SettingsProduct />}
      {selectedProductComponent === 'Create Product' && <Product />}


      {/* PROVIDER COMPONENTS */}
      {selectedProviderComponent === 'Providers' && <ProvidersAll />}
      {selectedProviderComponent === 'Create Provider' && <Provider />}



      {/* CATEGORY COMPONENTS */}
      {selectedCategoryComponent === 'Category' && <ShowCategory />}
      {selectedCategoryComponent === 'Create Category' && <Category />}

      {/* USER COMPONENTS */}
      {selectedUserComponent === 'User' && <UsersAll />}
      {selectedUserComponent === 'Create User' && <CreateUser />}

    </>
  ) : (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
      <img src={logo} alt="ProdElevate" />
      <h3 style={{fontFamily:'Poppins', color:'#fff', fontWeight:'700'}}>ONLINE SALES AND ADMINISTRATION SYSTEM</h3>
    </div>
  )}
            </div>
          </div>
            
        </div>
    )
}