import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const FilterModal = ({ show, handleClose, handleFilter }) => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    brand: "",
    condition: "",
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

  const conditionOptions = ["Brand New", "Used", "Like New"];

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filtrar Datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Group controlId="formMinPrecio">
              <Form.Label>Precio Minimo</Form.Label>
              <Form.Control
                type="number"
                placeholder="introduce el precio minimo"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formMaxPrecio">
              <Form.Label>Precio Maximo</Form.Label>
              <Form.Control
                type="number"
                placeholder="introduce el precio maximo"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="introduce la categoria"
                name="category"
                value={filters.category}
                onChange={handleInputChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="introduce la marca"
                name="brand"
                value={filters.brand}
                onChange={handleInputChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formCondition">
              <Form.Label>Condición</Form.Label>
              <Form.Control
                as="select"
                name="condition"
                value={filters.condition}
                onChange={handleInputChange}
              >
                <option value="">Selecciona una opción</option>
                {conditionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleApplyFilter}>
            Filtrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilterModal;
