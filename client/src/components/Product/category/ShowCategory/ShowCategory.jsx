import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategory } from '../../../../redux/actions/actions';
import { Link } from "react-router-dom";
import styles from "./ShowCategory.module.css";
import { Table } from 'reactstrap';


export const ShowCategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  
  const category = useSelector((state) => state.category);



  const comparecategory = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };
  if (Array.isArray(category)) {
    category.sort(comparecategory);
  }
  

 
  console.log("desde show:" , category)
  if (!category || category.length === 0) return <div>Loading...</div>;

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(categoryId));
    }
  };
  return (
    <div className={styles.container}>
      <h3 style={{fontFamily:'Poppins'}}>Categories</h3>
    <div className={styles.categoryContainer}>
      {category?.map((category) => (
        <Table key={category.id} className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th><Link title="Edit Category" to={`/categoryedit/${category.id}`}>
                  <button className={styles.edit}>
                    <ion-icon name="create"></ion-icon>
                  </button>
                  </Link>
                  <button className={styles.delete} onClick={() => handleDeleteCategory(category.id)}>
                    <ion-icon name="trash"></ion-icon>
          </button>
              </th>
            </tr>
          </thead>
            <tbody>
              <tr>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>{null}</td>
              </tr>
            </tbody>

         
      
        </Table>
      )
      )
    }
    </div>
    </div>
  );
};

