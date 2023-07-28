import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../../../redux/actions/actions';
import { Link } from "react-router-dom";
import styles from "./ShowCategory.module.css";
import { Table } from 'reactstrap';


export const ShowCategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  
  const category = useSelector((state) => state.category);
  useEffect(() => {
    // Si category es un objeto, volvemos a obtener el array
    if (typeof category === 'object') {
      dispatch(getCategory());
    }   
  }, [category, dispatch]);

  const comparecategory = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };
  if (typeof category === 'Array') {
    category.sort(comparecategory);
    
  }   

 
  console.log("desde show:" , category)
  if (!category || category.length === 0) return <div>Loading...</div>;
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

