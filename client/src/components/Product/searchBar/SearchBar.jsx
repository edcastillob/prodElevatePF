import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductName } from "../../../redux/actions/actions";


export const SearchBar = () => {
    
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = ({ target }) => {
    const { value } = target;  
    setName(value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getProductName(name));
    setName("");
  };
  return (
    <div>
      <input
        type="search"
        placeholder=" search product "
        name="name"
        value={name}
        onChange={handleChange}
      />

      <button
        type="submit"
        onClick={handleClick}
      >
        search product
      </button>
    </div>
  );
};
