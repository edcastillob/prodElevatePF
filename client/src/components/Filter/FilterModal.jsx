import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/actions/actions";
import styles from "./FilterModal.module.css";
import { useTranslation } from 'react-i18next';

const FilterModal = ({ show, handleClose, handleFilter, currentLanguage }) => {
  const { t } = useTranslation('global');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  const category = useSelector((state) => state.category);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    brand: "",
    condition: "",
    reviewFilter: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilter = () => {
    handleFilter(filters);
  };

  const conditionOptions = [
    t("filter-modal.brand-new", { lng: currentLanguage }),
    t("filter-modal.used", { lng: currentLanguage }),
    t("filter-modal.like-new", { lng: currentLanguage })
  ];

  //console.log(filters);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("filter-modal.filters", { lng:currentLanguage })}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.form}>
            <Form.Group controlId="formMinPrecio">
              <Form.Label>{t("filter-modal.min-price", { lng:currentLanguage })}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("filter-modal.min-price-ph", { lng:currentLanguage })}
                name="minPrice"
                className={styles.input}
                value={filters.minPrice}
                onChange={handleInputChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formMaxPrecio">
              <Form.Label>{t("filter-modal.max-price", { lng:currentLanguage })}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("filter-modal.max-price-ph", { lng:currentLanguage })}
                name="maxPrice"
                value={filters.maxPrice}
                className={styles.input}
                onChange={handleInputChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>{t("filter-modal.category", { lng:currentLanguage })}</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={filters.category}
                className={styles.input}
                onChange={handleInputChange}
              >
                <option value="">{t("filter-modal.select-option", { lng:currentLanguage })}</option>
                {category.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBrand">
              <Form.Label>{t("filter-modal.brand", { lng:currentLanguage })}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("filter-modal.brand", { lng:currentLanguage })}
                name="brand"
                value={filters.brand}
                className={styles.input}
                onChange={handleInputChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formCondition">
              <Form.Label>{t("filter-modal.condition", { lng:currentLanguage })}</Form.Label>
              <Form.Control
                as="select"
                name="condition"
                value={filters.condition}
                className={styles.input}
                onChange={handleInputChange}
              >
                <option value="">{t("filter-modal.select-option", { lng:currentLanguage })}</option>
                {conditionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
              <Form.Control
              type="text"
              placeholder={t("filter-modal.review-filter", { lng: currentLanguage })}
              name="reviewFilter"
              value={filters.reviewFilter}
              className={styles.input}
              onChange={handleInputChange}
            />
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {t("filter-modal.close", { lng:currentLanguage })}
          </Button>
          <Button variant="primary" onClick={handleApplyFilter}>
          {t("filter-modal.filter", { lng:currentLanguage })}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilterModal;
