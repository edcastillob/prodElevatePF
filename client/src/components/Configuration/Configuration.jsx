import React, { useEffect, useRef, useState } from 'react';
import styles from './Configuration.module.css';
import config from '../../assets/config_logo.png';
import { Link } from 'react-router-dom';
import { Provider } from '../Product/provider/Provider'
import { Category } from '../Product/category/Category';
import { Product } from '../Product/createProduct/Product';



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

  // Toggle Provider dropdown
  const toggleProviderDropdown = () => {
    setIsProviderDropdownOpen(!isProviderDropdownOpen);

    // Close other dropdowns
    setIsProductDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  // Toggle Product dropdown
  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);

    // Close other dropdowns
    setIsProviderDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  // Toggle Category dropdown
  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);

    // Close other dropdowns
    setIsProductDropdownOpen(false);
    setIsProviderDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  // Toggle User dropdown
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);

    // Close other dropdowns
    setIsProductDropdownOpen(false);
    setIsProviderDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
  };

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

  // Handle Category option click
  const handleUserOptionClick = (component) => {
    setSelectedUserComponent(component);
    setIsUserDropdownOpen(false);
    setComponentSelected(true);

    // Resetear el estado de las otras opciones seleccionadas
    setSelectedProviderComponent(null);
    setSelectedProductComponent(null);
  };

  useEffect(() => {
    // Event listener to close dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (
        providerDropdownRef.current && !providerDropdownRef.current.contains(event.target) &&
        productDropdownRef.current && !productDropdownRef.current.contains(event.target) &&
        categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target) &&
        userDropdownRef.current && !userDropdownRef.current.contains(event.target)
      ) {
        setIsProviderDropdownOpen(false);
        setIsProductDropdownOpen(false);
        setIsCategoryDropdownOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <img src={config} alt="Settings" />
                <h4>Settings</h4>
            </div>
            <div className={styles.content}>
            <div className={styles.sidebar}>
            <div className={styles.optionContainer}>
            {/* PRODUCT */}
            <div className={`${styles.options} dropdown-toggle`} onClick={toggleProductDropdown}>
            <span style={{fontSize:'1.3rem', marginRight:'0.5rem'}}><ion-icon name="basket"></ion-icon></span>Product
            </div>
            {isProductDropdownOpen && (
              <div ref={productDropdownRef} className={styles.dropdown}>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleProductOptionClick('Create Product')}
                >
                  <ion-icon name="add"></ion-icon>Create Product
                </div>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleProductOptionClick('Edit Product')}
                >
                  <ion-icon name="create"></ion-icon>Edit Product
                </div>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleProductOptionClick('Delete Product')}
                >
                  <ion-icon name="trash"></ion-icon>Delete Product
                </div>
              </div>
            )}
          </div>

          <div className={styles.optionContainer}>
            {/* PROVIDER */}
            <div className={`${styles.options} dropdown-toggle`} onClick={toggleProviderDropdown}>
            <span style={{fontSize:'1.3rem', marginRight:'0.5rem'}}><ion-icon name="contacts"></ion-icon></span>Provider
            </div>
            {isProviderDropdownOpen && (
              <div ref={providerDropdownRef} className={styles.dropdown}>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleProviderOptionClick('Create Provider')}
                >
                  <ion-icon name="add"></ion-icon>Create Provider
                </div>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleProviderOptionClick('Edit Provider')}
                >
                  <ion-icon name="create"></ion-icon>Edit Provider
                </div>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleProviderOptionClick('Delete Provider')}
                >
                  <ion-icon name="trash"></ion-icon>Delete Provider
                </div>
              </div>
            )}
          </div>

          <div className={styles.optionContainer}>
            {/* CATEGORY */}
            <div className={`${styles.options} dropdown-toggle`} onClick={toggleCategoryDropdown}>
            <span style={{fontSize:'1.3rem', marginRight:'0.5rem'}}><ion-icon name="apps"></ion-icon></span>Category
            </div>
            {isCategoryDropdownOpen && (
              <div ref={categoryDropdownRef} className={styles.dropdown}>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleCategoryOptionClick('Create Category')}
                >
                  <ion-icon name="add"></ion-icon>Create Category
                </div>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleCategoryOptionClick('Edit Category')}
                >
                  <ion-icon name="create"></ion-icon>Edit Category
                </div>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleCategoryOptionClick('Delete Category')}
                >
                  <ion-icon name="trash"></ion-icon>Delete Category
                </div>
              </div>
            )}
          </div>

          <div className={styles.optionContainer}>
              {/* USER */}
            <div className={`${styles.options} dropdown-toggle`} onClick={toggleUserDropdown}>
            <span style={{fontSize:'1.3rem', marginRight:'0.5rem'}}><ion-icon name="contact"></ion-icon></span>User
            </div>
            {isUserDropdownOpen && (
              <div ref={userDropdownRef} className={styles.dropdown}>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleUserOptionClick('Create User')}
                >
                  <ion-icon name="add"></ion-icon>Create User
                </div>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleUserOptionClick('Edit User')}
                >
                  <ion-icon name="create"></ion-icon>Edit User
                </div>
                <div
                  className={styles.dropdownOption}
                  onClick={() => handleUserOptionClick('Delete User')}
                >
                  <ion-icon name="trash"></ion-icon>Delete User
                </div>
              </div>
            )}
          </div>

          

        </div>

             


                  
            <div className={styles.components}>
            {componentSelected ? (
    <>
      {/* PRODUCT COMPONENTS */}
      {selectedProductComponent === 'Create Product' && <Product />}


      {/* PROVIDER COMPONENTS */}
      {selectedProviderComponent === 'Create Provider' && <Provider />}

      {/* CATEGORY COMPONENTS */}
      {selectedCategoryComponent === 'Create Category' && <Category />}
      
    </>
  ) : (
    <div>
      <img src="/ruta-de-la-imagen.jpg" alt="Imagen por defecto" />
      <p>Texto por defecto antes de seleccionar algún componente.</p>
    </div>
  )}
            </div>
          </div>
            
        </div>
    )
}