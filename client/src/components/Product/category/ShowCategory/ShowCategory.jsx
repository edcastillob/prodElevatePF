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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const category = useSelector((state) => state.category);
  const [searchCategory, setSearchCategory] = useState("");

  if (!category || category.length === 0) return <div>{t("user-all.loading", { lng: currentLanguage })}</div>;
  if (!Array.isArray(category)) return <div>{t("user-all.loading", { lng: currentLanguage })}</div>;

  const sortedCategory = category
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredCategory = sortedCategory.filter((category) =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase())
  );


  const handleDeleteCategory = (categoryId) => {
    setCategoryIdToDelete(categoryId); 
    setShowConfirmation(true); 
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(categoryIdToDelete)); 
    setCategoryIdToDelete(null); 
    setShowConfirmation(false); 
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
                  <th>{t("show-category.name", { lng: currentLanguage })}</th>
                  <th>{t("show-category.description", { lng: currentLanguage })}</th>
                  <th>{t("show-category.actions", { lng: currentLanguage })}</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategory?.map((category) => (
                  <tr key={category.id}>
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
                      {/* <button
                        className={styles.delete}
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <ion-icon name="trash"></ion-icon>
                      </button> */}
                    </td>
                  </tr>
                ))}
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

