import styles from "../../Dashboard/Dashboard.module.css";
import { MdMenu, MdSearch } from "react-icons/md";
import { useState } from "react"; // Importa useState
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../../../redux/actions/actions";
import { Link } from "react-router-dom";
import { BsTabletFill } from "react-icons/bs";
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import userDefault from '../../../assets/default-user.png'




export const UsersAll = ({ toggleActive, currentLanguage }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const { t } = useTranslation('global');

  const users = useSelector((state) => state.users);
  const [searchUsers, setSearchUsers] = useState("");

  const [showUsers, setShowUsers] = useState([]);
  const [allSelectCheck, setAllSelectCheck] = useState(false);

  const filteredUsers = users.filter((users) =>
  users.email.toLowerCase().includes(searchUsers.toLowerCase())
  );

  useEffect(() => {
    setShowUsers(users)
  }, [users])

  useEffect(() => {
    setShowUsers(filteredUsers)
  }, [searchUsers])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (!users || users.length === 0) return <div>{t("user-all.loading", { lng: currentLanguage })}</div>;
  if (!Array.isArray(users)) return <div>{t("user-all.loading", { lng: currentLanguage })}</div>;

  const handleDeleteUsers = (UsersId) => {
    setUserIdToDelete(UsersId); 
    setShowConfirmation(true); 
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUsers(userIdToDelete)); 
    setUserIdToDelete(null); 
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
          let tempUsers = showUsers.map((i) =>{
            return { ...i, isChecked: checked }
          });
          setShowUsers(tempUsers)
      } else {
        let tempUsers = showUsers.map((user) => {
          if (user.id === name) {
            return { ...user, isChecked: checked }
          } else { 
            return user
          }
        });

        setShowUsers(tempUsers);
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
            <h2 style={{fontFamily:'Poppins'}}>{t("user-all.users", { lng: currentLanguage })}</h2>
          </div>

          {/* input search */}
          <div className={styles.search}>
            <label>
              <input
                type="text"
                placeholder={t("user-all.search", { lng: currentLanguage })}
                value={searchUsers}
                onChange={(event) => setSearchUsers(event.target.value)}
              />
                <MdSearch size="2em" className={styles.icon} />
            </label>
          </div>

          <div className={styles.userContainer}>
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
                  <th>{t("user-all.user", { lng: currentLanguage })}</th>
                  <th>{t("user-all.name", { lng: currentLanguage })}</th>
                  <th>Email</th>
                  <th>{t("user-all.actions", { lng: currentLanguage })}</th>
                </tr>
              </thead>
              <tbody>
                {showUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <input
                        type="checkbox"
                        name={user.id}
                        checked={user?.isChecked || false}
                        onChange={handleChangeCheckBox}
                      />
                    </td>
                    <td>
                      <div className={styles.divImg}>
                        <img
                          className={styles.img}
                          src={user.image.length ? user.image : userDefault}
                          alt={user.name}
                          width={80}
                          height='80px'
                          style={{ borderRadius: '50%' }}
                        />
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link title="Edit user" to={`/userEdit/${user.id}`}>
                        <button className={styles.edit}>
                          <ion-icon name="create"></ion-icon>
                        </button>
                      </Link>
                      <button
                        className={styles.delete}
                        style={{ display: !user.isChecked ||  allSelectCheck === true ? 'none' : null }}
                        onClick={() => handleDeleteUsers(user.id)}
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
                  <td></td>
                  <td>
                    <button
                      className={styles.delete}
                      style={{ display: !allSelectCheck ? 'none' : null }}
                      onClick={() => handleDeleteUsers(users.map(user => user.id))}
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
         <h6 style={{fontFamily:'Poppins'}}>Are you sure you want to delete this User?</h6> 
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
