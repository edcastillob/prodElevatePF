import { useState } from "react"; // Importa useState
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import styles from "./SettingProduct.module.css";
import {  deleteUsers, getUsers } from "../../../redux/actions/actions";

export const UsersAll = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.users);
  const [searchUsers, setSearchUsers] = useState('');

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
      <h2>Users Administration</h2>      
      <input
        type="text"
        placeholder="Search user"
        value={searchUsers}
        onChange={(event) => setSearchUsers(event.target.value)}
      />

      {filteredUsers?.map((user) => (
        <div key={user.id}>
         
          <h5 >Email: {user.name}</h5>   
          <h5 >Email: {user.email}</h5>   
          <Link title="Edit user" to={`/userEdit/${user.id}`}>
            <button>
              <ion-icon name="create"></ion-icon>
            </button>
          </Link>
          <button onClick={() => handleDeleteUsers(user.id)}>
              <ion-icon name="close"></ion-icon>
          </button>
        </div>
      ))}
    </div>
  );
};
