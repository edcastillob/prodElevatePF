import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../../../redux/actions/actions';

export const ShowCategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const categories = useSelector((state) => state.category);

  const compareCategories = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };
  categories.sort(compareCategories);

  const handleEdit = (category) => {
    console.log('Editar categoría:', category);
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} style={categoryContainerStyle}>
          <div>Name: {category.name}</div>
          <div>Description: {category.description}</div>
          <button className='btn btn-dark' onClick={() => handleEdit(category)}>Update</button>
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
