import { useState } from "react"; // Importa useState
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProvider, getProvider } from "../../../../redux/actions/actions";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import styles from "./ProvidersAll.module.css";

export const ProvidersAll = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvider());
  }, []);

  const provider = useSelector((state) => state.provider);
  const [searchProvider, setSearchProvider] = useState("");

  if (!provider || provider.length === 0) return <div>Loading...</div>;
  if (!Array.isArray(provider)) return <div>Loading...</div>;

  const sortedProvider = provider
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredProvider = sortedProvider.filter((provider) =>
    provider.name.toLowerCase().includes(searchProvider.toLowerCase())
  );

  const handleDeleteProvider = (providerId) => {
    if (window.confirm("Are you sure you want to delete this provider?")) {
      dispatch(deleteProvider(providerId));
    }
  };

  return (
    <div className={styles.container}>
      <h2 style={{ fontFamily: "Poppins" }}>Providers</h2>

      <input
        type="text"
        className="form-control w-25 mb-3"
        placeholder="Search provider"
        value={searchProvider}
        onChange={(event) => setSearchProvider(event.target.value)}
      />

      <div className={styles.tablesContainer}>
        {filteredProvider.map((provider) => (
          <Table key={provider.id} className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Document N°</th>
                <th>Email</th>
                <th>Phone N°</th>
                <th>
                  <Link
                    title="Edit provider"
                    to={`/proveedoredit/${provider.id}`}
                  >
                    <button className={styles.edit}>
                      <ion-icon name="create"></ion-icon>
                    </button>
                  </Link>
                  <button
                    className={styles.delete}
                    onClick={() => handleDeleteProvider(provider.id)}
                  >
                    <ion-icon name="trash"></ion-icon>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{provider.name}</td>
                <td>{provider.identification}</td>
                <td>{provider.email}</td>
                <td>{provider.numPhone}</td>
                <td>{null}</td>
              </tr>
            </tbody>
          </Table>
        ))}
      </div>
    </div>
  );
};
