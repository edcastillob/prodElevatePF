import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategory } from '../../../../redux/actions/actions';
import { Link } from "react-router-dom";


export const ShowCategory = () => {
  const category = useSelector((state) => state.category);
  const [searchCategory, setSearchCategory] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  if (!category || category.length === 0) return <div>Loading...</div>;
  if (!Array.isArray(category)) return <div>Loading...</div>;
  



  const sortedCategory = category
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));
 
  
  const filteredCategory = sortedCategory.filter((category) =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase())
  );
 


  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(categoryId));
    }
  };
  return (
    <div>
    <h2>ProvidersAll</h2>      
    <input
      type="text"
      placeholder="Search category"
      value={searchCategory}
      onChange={(event) => setSearchCategory(event.target.value)}
    />
      {filteredCategory?.map((category) => (
        <div key={category.id} style={categoryContainerStyle}>            
          <div>Name: {category.name}</div>
          <div>Description: {category.description}</div>
         
      <Link title="Edit Category" to={`/categoryedit/${category.id}`}>
            <button>
              <ion-icon name="create"></ion-icon>
            </button>
          </Link>
          <button onClick={() => handleDeleteCategory(category.id)}>
              <ion-icon name="close"></ion-icon>
          </button>
        </div>
      ))}
    </div>
  );
};
const categoryContainerStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '10px',
};
