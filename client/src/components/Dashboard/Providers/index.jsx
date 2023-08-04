import styles from "../Dashboard.module.css";
import { MdMenu, MdSearch } from "react-icons/md";
import { useState } from "react"; // Importa useState
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProvider, getProvider } from "../../../redux/actions/actions";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';




const Providers = ({ toggleActive }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [providerIdToDelete, setProviderIdToDelete] = useState(null);

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
    setProviderIdToDelete(providerId); 
    setShowConfirmation(true); 
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(providerIdToDelete)); 
    setProviderIdToDelete(null); 
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
            <h2 style={{fontFamily:'Poppins'}}>Providers</h2>
          </div>

          {/* input search */}
          <div className={styles.search}>
            <label>
              <input
                 type="text"
                 placeholder="Search provider"
                 value={searchProvider}
                 onChange={(event) => setSearchProvider(event.target.value)}
              />
                <MdSearch size="2em" className={styles.icon} />
            </label>
          </div>

          <div className={styles.tablesContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Document N°</th>
                  <th>Email</th>
                  <th>Phone N°</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProvider?.map((provider) => (
                  <tr key={provider.id} >
                    <td style={{ padding: '1.5rem' }}>{provider.name}</td>
                    <td style={{ padding: '1.5rem' }}>{provider.identification}</td>
                    <td style={{ padding: '1.5rem' }}>{provider.email}</td>
                    <td style={{ padding: '1.5rem' }}>{provider.numPhone}</td>
                    <td>
                      <Link
                        title="Edit provider"
                        to={`/proveedoredit/${provider.id}`}
                      >
                        <button className={styles.edit}>
                          <ion-icon name="create"></ion-icon>
                        </button>
                      </Link>
                      {/* <button
                        className={styles.delete}
                        onClick={() => handleDeleteProvider(provider.id)}
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
         <h6 style={{fontFamily:'Poppins'}}>Are you sure you want to delete this provider?</h6> 
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

export default Providers;
