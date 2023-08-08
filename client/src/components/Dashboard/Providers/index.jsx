import styles from "../Dashboard.module.css";
import { MdMenu, MdSearch } from "react-icons/md";
import { useState, useEffect } from "react"; // Importa useState
import { useDispatch, useSelector } from "react-redux";
import { deleteProvider, getProvider } from "../../../redux/actions/actions";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';



const Providers = ({ toggleActive, currentLanguage }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [providerIdToDelete, setProviderIdToDelete] = useState(null);
  const { t } = useTranslation('global');

  const provider = useSelector((state) => state.provider);
  const [searchProvider, setSearchProvider] = useState("");

  const [foo, setFoo] = useState([])
  const [allSelectCheck, setAllSelectCheck] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvider());
  }, []);

  useEffect(() => {
    setFoo(provider)
  }, [])

  if (!provider || provider.length === 0) return <div>{t("user-all.loading", { lng: currentLanguage })}</div>;
  if (!Array.isArray(provider)) return <div>{t("user-all.loading", { lng: currentLanguage })}</div>;

  const sortedProvider = provider
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredProvider = sortedProvider.filter((provider) =>
    provider.name.toLowerCase().includes(searchProvider.toLowerCase())
  );


  const handleDeleteProvider = (providerId) => {
    console.log(providerId, 'all ids')
    setProviderIdToDelete(providerId); 
    setShowConfirmation(true); 
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProvider(providerIdToDelete)); 
    setProviderIdToDelete(null); 
    setShowConfirmation(false); 
  };

  const defineAllCheckedState = (items) => {
    const result = items.filter((item) => !item.isChecked )
    if (result.length >= 1) {
      return false
    } else {
      return true  
    }
  }
  console.log(foo, 'lopl')
  const handleChangeCheckBox = (event) => {
    const { name, checked } = event.target;
      if (name === 'allSelect') {
        setAllSelectCheck(checked)
          let tempProviders = foo.map((i) =>{
            return { ...i, isChecked: checked }
          });
          setFoo(tempProviders)
      } else {
        let tempProviders = foo.map((provider) => {
          if (provider.id === parseInt(name)) {
            return { ...provider, isChecked: checked }
          } else { 
            return provider
          }
          // provider.id === parseInt(name) ? { ...provider, isChecked: checked } : provider
        });

        setFoo(tempProviders)
        setAllSelectCheck(defineAllCheckedState(tempProviders))
      }
  }


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
            <h2 style={{fontFamily:'Poppins'}}>{t("providers-all.providers", { lng: currentLanguage })}</h2>
          </div>

          {/* input search */}
          <div className={styles.search}>
            <label>
              <input
                 type="text"
                 placeholder={t("providers-all.search", { lng: currentLanguage })}
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
                  <th>
                    <input
                      type="checkbox"
                      name='allSelect'
                      checked={allSelectCheck}
                      onChange={handleChangeCheckBox}
                    />
                  </th>
                  <th>{t("providers-all.name", { lng: currentLanguage })}</th>
                  <th>{t("providers-all.document", { lng: currentLanguage })}</th>
                  <th>Email</th>
                  <th>{t("providers-all.phone", { lng: currentLanguage })}</th>
                  <th>{t("providers-all.actions", { lng: currentLanguage })}</th>
                </tr>
              </thead>
              <tbody>
                {foo?.map((provider) => (
                  <tr key={provider.id} >
                    <td>
                      <input
                        type="checkbox"
                        name={provider.id}
                        checked={provider?.isChecked || false}
                        onChange={handleChangeCheckBox}
                      />
                    </td>
                    <td style={{ padding: '1.5rem' }}>{provider.name}</td>
                    <td style={{ padding: '1.5rem' }}>{provider.identification}</td>
                    <td style={{ padding: '1.5rem' }}>{provider.email}</td>
                    <td style={{ padding: '1.5rem' }}>{provider.numPhone}</td>
                    {/* <td style={{ padding: '1.5rem', textTransform: 'capitalize' }}>{provider.country}</td> */}
                    <td>
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
                        style={{ display: !provider.isChecked ||  allSelectCheck === true ? 'none' : null }}
                        onClick={() => handleDeleteProvider(provider.id)}
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
                  <td></td>
                  <td>
                    <button
                      className={styles.delete}
                      style={{ display: !allSelectCheck ? 'none' : null }}
                      onClick={() => handleDeleteProvider(provider.map(prov => prov.id))}
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
