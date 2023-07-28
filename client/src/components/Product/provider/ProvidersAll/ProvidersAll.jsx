import { useState } from "react"; // Importa useState
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProvider, getProvider } from "../../../../redux/actions/actions";
import { Link } from "react-router-dom";
import styles from "./Providers.module.css";

export const ProvidersAll = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvider());
  }, []);

  const provider = useSelector((state) => state.provider);
  const [searchProvider, setSearchProvider] = useState('');

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
    <div>
      <h2>ProvidersAll</h2>      
      <input
        type="text"
        placeholder="Search provider"
        value={searchProvider}
        onChange={(event) => setSearchProvider(event.target.value)}
      />

      {filteredProvider.map((provider) => (
        <div key={provider.id} className={styles.cardContainer}>
          <h5 className={styles.title}>Name: {provider.name}</h5>
          <h6 className={styles.price}>
            Identification: {provider.identification}
          </h6>
          <h6 className={styles.price}>Email: {provider.email}</h6>
          <h6 className={styles.price}>Phone Number: {provider.numPhone}</h6>

          <Link title="Edit provider" to={`/proveedoredit/${provider.id}`}>
            <button>
              <ion-icon name="create"></ion-icon>
            </button>
          </Link>
          <button onClick={() => handleDeleteProvider(provider.id)}>
              <ion-icon name="close"></ion-icon>
          </button>
        </div>
      ))}
    </div>
  );
};
