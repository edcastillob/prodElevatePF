import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../../../redux/actions/actions';
import { Link } from "react-router-dom";


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
    <div>
      {category?.map((category) => (
        <div key={category.id} style={categoryContainerStyle}>            
          <div>Name: {category.name}</div>
          <div>Description: {category.description}</div>
         
      <Link title="Edit Category" to={`/categoryedit/${category.id}`}>
            <button>
              <ion-icon name="create"></ion-icon>
            </button>
          </Link>
        </div>
      )
      )
      }
    </div>
  );
};
const categoryContainerStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '10px',
};
