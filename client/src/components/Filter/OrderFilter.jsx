import styles from "./OrderFilter.module.css";
import { useTranslation } from 'react-i18next';

const OrderFilter = ({
  handlePriceHigher,
  handlePriceLower,
  handleSortName,
  handleAllProdutcs,
  currentLanguage
}) => {
  const { t } = useTranslation('global');

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.orderTitle}>{t("order-filter.order", { lng: currentLanguage })}</h2>
        <div className={styles.orderFlex}>
          <button className={styles.btns} onClick={handleAllProdutcs}>
          {t("order-filter.all-products", { lng: currentLanguage })}
          </button>
          <button className={styles.btns} onClick={handleSortName}>
          {t("order-filter.name", { lng: currentLanguage })}
          </button>
          <button className={styles.btns} onClick={handlePriceHigher}>
          {t("order-filter.highest-price", { lng: currentLanguage })}
          </button>
          <button className={styles.btns} onClick={handlePriceLower}>
          {t("order-filter.lowest-price", { lng: currentLanguage })}
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderFilter;
