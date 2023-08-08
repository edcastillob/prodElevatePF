import styles from "../../../Dashboard/Dashboard.module.css";
import { MdMenu, MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategory } from "../../../../redux/actions/actions";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const ShowCategory = ({ toggleActive, currentLanguage }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const { t } = useTranslation('global');

  const category = useSelector((state) => state.category);
  const [searchCategory, setSearchCategory] = useState("");

  const [showCategories, setShowCategories] = useState([])
  const [allSelectCheck, setAllSelectCheck] = useState(false);

  const filteredCategory = category.filter((category) =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase())
  );
  
  useEffect(() => {
    setShowCategories(category)
  }, [category])

  useEffect(() => {
    setShowCategories(filteredCategory)
  }, [searchCategory])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  if (!category || category.length === 0) return <div>{t("user-all.loading", { lng: currentLanguage })}</div>;
  if (!Array.isArray(category)) return <div>{t("user-all.loading", { lng: currentLanguage })}</div>;

  const handleDeleteCategory = (categoryId) => {
    setCategoryIdToDelete(categoryId); 
    setShowConfirmation(true); 
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCategory(categoryIdToDelete)); 
    setCategoryIdToDelete(null); 
    setShowConfirmation(false); 
  };

  // Check all 
  const defineAllCheckedState = (items) => {
    const result = items.filter((item) => !item.isChecked )
    if (result.length >= 1) {
      return false
    } else {
      return true  
    }
  };
  
  const handleChangeCheckBox = (event) => {
    const { name, checked } = event.target;
      if (name === 'allSelect') {
        setAllSelectCheck(checked)
          let tempUsers = showCategories.map((i) =>{
            return { ...i, isChecked: checked }
          });
          setShowCategories(tempUsers)
      } else {
        let tempUsers = showCategories.map((categ) => {
          if (categ.id === parseInt(name)) {
            return { ...categ, isChecked: checked }
          } else { 
            return categ
          }
        });

        setShowCategories(tempUsers);
        setAllSelectCheck(defineAllCheckedState(tempUsers));
      }
  };


  return (
    <div>
      {/* TOPBAR */}
      <div className={styles.topbar}>
        <div className={styles.toggle} onClick={toggleActive}>
          <MdMenu />
        </div>
      </div>

      <div className={styles.customers}>
        <div className={styles.wrapper}>
          <div className={styles.customersHeader}>
            <h2 style={{fontFamily:'Poppins'}}>{t("show-category.categories", { lng: currentLanguage })}</h2>
          </div>

          {/* input search */}
          <div className={styles.search}>
            <label>
              <input
                type="text"
                placeholder={t("show-category.search", { lng: currentLanguage })}
                value={searchCategory}
                onChange={(event) => setSearchCategory(event.target.value)}
              />
                <MdSearch size="2em" className={styles.icon} />
            </label>
          </div>

          <div className={styles.categoryContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      name='allSelect'
                      checked={allSelectCheck}
                      onChange={handleChangeCheckBox}
                    />
                  </th>
                  <th>{t("show-category.name", { lng: currentLanguage })}</th>
                  <th>{t("show-category.description", { lng: currentLanguage })}</th>
                  <th>{t("show-category.actions", { lng: currentLanguage })}</th>
                </tr>
              </thead>
              <tbody>
                {showCategories?.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <input
                        type="checkbox"
                        name={category.id}
                        checked={category?.isChecked || false}
                        onChange={handleChangeCheckBox}
                      />
                    </td>
                    <td style={{ padding: '1.5rem' }}>{category.name}</td>
                    <td style={{ padding: '1.5rem' }}>{category.description}</td>
                    <td style={{ padding: '1.5rem' }}>
                      <Link
                        title="Edit Category"
                        to={`/categoryedit/${category.id}`}
                      >
                        <button className={styles.edit}>
                          <ion-icon name="create"></ion-icon>
                        </button>
                      </Link>
                      <button
                        className={styles.delete}
                        style={{ display: !category.isChecked ||  allSelectCheck === true ? 'none' : null }}
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <ion-icon name="trash"></ion-icon>
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      className={styles.delete}
                      style={{ display: !allSelectCheck ? 'none' : null }}
                      onClick={() => handleDeleteCategory(category.map(categ => categ.id))}
                    >
                      Dellete All
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
      </div>
        </div>
      </div>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title> <h4 style={{fontFamily:'Poppins'}}>Confirmation</h4>
           </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <h6 style={{fontFamily:'Poppins'}}>Are you sure you want to delete this category?</h6> 
        </Modal.Body>
        <Modal.Footer>
          <Button style={{fontFamily:'Poppins'}} variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button style={{fontFamily:'Poppins'}} variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

