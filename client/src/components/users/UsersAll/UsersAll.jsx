import styles from "../../Dashboard/Dashboard.module.css";
import { MdMenu, MdSearch } from "react-icons/md";
import { useState } from "react"; // Importa useState
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUsers,
  getUsers,
  getUsersInactive,
  getUsersByName,
} from "../../../redux/actions/actions";
import { Link } from "react-router-dom";
import { BsTabletFill } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DashOrderUser from "../../Dashboard/DashFilter/DashOrderUser";
import loading from "../../../assets/loading.png";

export const UsersAll = ({ toggleActive, currentLanguage }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const { t } = useTranslation("global");
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const currentPage = useSelector((state) => state.currentPage) || 1;
  const totalPages = useSelector((state) => state.totalPages);
  const usersInactive = useSelector((state) => state.usersInactive);

  const [optionUsers, setoptionUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState("");
  // console.log(optionUsers);
  // console.log(currentPage);
  // console.log(totalPages);
  useEffect(() => {
    dispatch(getUsers(currentPage));
  }, []);

  useEffect(() => {
    setoptionUsers(users.length ? users : usersInactive);
  }, [users, usersInactive]);

  // if (!users || users.length === 0)
  //   return <div>{t("user-all.loading", { lng: currentLanguage })}</div>;
  // if (!Array.isArray(users))
  //   return <div>{t("user-all.loading", { lng: currentLanguage })}</div>;

  const sortedUsers = users
    .slice()
    .sort((a, b) => a.email.localeCompare(b.email));

  const filteredUsers = sortedUsers.filter((users) =>
    users.email.toLowerCase().includes(searchUsers.toLowerCase())
  );

  const handleDeleteUsers = (UsersId) => {
    setUserIdToDelete(UsersId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUsers(userIdToDelete));
    setUserIdToDelete(null);
    setShowConfirmation(false);
  };

  const handleActiveUsers = () => {
    dispatch(getUsers(currentPage));
  };

  const handleUsersInactive = () => {
    dispatch(getUsersInactive(currentPage));
  };

  const handleUsersByName = () => {
    dispatch(getUsersByName(currentPage));
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;

    if (nextPage <= totalPages) {
      dispatch(getUsers(nextPage));
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
            <h2 style={{ fontFamily: "Poppins" }}>
              {t("user-all.users", { lng: currentLanguage })}
            </h2>
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

          <div>
            <DashOrderUser
              handleActiveUsers={handleActiveUsers}
              handleUsersInactive={handleUsersInactive}
              handleUsersByName={handleUsersByName}
            />
          </div>
          {/* <div>
            <button onClick={handleOpenModal} className={styles.titleFilter}>
              Filter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                fill="currentColor"
                className="bi bi-funnel"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
              </svg>
            </button>
            <DashFilterModal />
              show={showModal}
              handleClose={handleCloseModal}
              handleFilter={handleFilter}
            />
          </div> */}

          <div className={styles.userContainer}>
            {optionUsers.length === 0 ? (
              <div>
                <div>
                  <img src={loading} alt="loading" />
                  <h2>Upsss</h2>
                  <h3>You have no inactive users.</h3>
                  <h4>
                    Please click on active users to see all your users and if
                    you want you can deactivate the one you like.
                  </h4>
                </div>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t("user-all.user", { lng: currentLanguage })}</th>
                    <th>{t("user-all.name", { lng: currentLanguage })}</th>
                    <th>Email</th>
                    <th>State</th>
                    <th>{t("user-all.actions", { lng: currentLanguage })}</th>
                  </tr>
                </thead>
                <tbody>
                  {optionUsers?.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className={styles.divImg}>
                          <img
                            className={styles.img}
                            src={user.image}
                            alt={user.name}
                          />
                        </div>
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isActive ? <p>Active</p> : <p>Inactive</p>}</td>
                      <td>
                        <Link title="Edit user" to={`/userEdit/${user.id}`}>
                          <button className={styles.edit}>
                            <ion-icon name="create"></ion-icon>
                          </button>
                        </Link>
                        {/* <button
                        className={styles.delete}
                        onClick={() => handleDeleteUsers(user.id)}
                      >
                        <ion-icon name="trash"></ion-icon>
                      </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <h4 style={{ fontFamily: "Poppins" }}>Confirmation</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ fontFamily: "Poppins" }}>
            Are you sure you want to delete this User?
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ fontFamily: "Poppins" }}
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            style={{ fontFamily: "Poppins" }}
            variant="danger"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => dispatch(getUsers(currentPage - 1))}
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
