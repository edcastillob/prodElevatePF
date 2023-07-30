import styles from "../../Dashboard/Dashboard.module.css";
import { MdMenu } from "react-icons/md";
import { useState } from "react"; // Importa useState
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../../../redux/actions/actions";
import { Link } from "react-router-dom";
import { BsTabletFill } from "react-icons/bs";


export const UsersAll = ({ toggleActive }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.users);
  const [searchUsers, setSearchUsers] = useState("");

  if (!users || users.length === 0) return <div>Loading...</div>;
  if (!Array.isArray(users)) return <div>Loading...</div>;

  const sortedUsers = users
    .slice()
    .sort((a, b) => a.email.localeCompare(b.email));

  const filteredUsers = sortedUsers.filter((users) =>
    users.email.toLowerCase().includes(searchUsers.toLowerCase())
  );

  const handleDeleteUsers = (UsersId) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      dispatch(deleteUsers(UsersId));
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
            <h2 style={{fontFamily:'Poppins'}}>Users</h2>
          </div>

      <input
        type="text"
        className="form-control w-25 h-75"
        placeholder="Search user"
        value={searchUsers}
        onChange={(event) => setSearchUsers(event.target.value)}
      />
          <div className={styles.userContainer}>
        {filteredUsers?.map((user) => (
          <table key={user.id} className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Name</th>
                <th>Email</th>
                <th>
                  <Link title="Edit user" to={`/userEdit/${user.id}`}>
                    <button className={styles.edit}>
                      <ion-icon name="create"></ion-icon>
                    </button>
                  </Link>
                  <button
                    className={styles.delete}
                    onClick={() => handleDeleteUsers(user.id)}
                  >
                    <ion-icon name="trash"></ion-icon>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
                <td>{null}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
        </div>
      </div>
    </div>
  );

};
