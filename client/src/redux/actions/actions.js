import { SHOW_PRODUCTS, GET_PRODUCT_NAME, GET_PRODUCT_DETAIL, ADD_PRODUCT, ADD_CATEGORY, ADD_PROVIDER, GET_CATEGORY, ADD_ROLE } from "./types";
import axios from "axios";
import { ENDPOINT } from "../../components/endpoint/ENDPOINT";
const FAKE = 'https://fakestoreapi.com/products';


export const showProducts = () => { 

    try {
        return async(dispatch) => {
            axios.get(FAKE)
            .then(response => {                
            if(!response.data) throw Error('¡The product does not exist!');
            return dispatch({ type: SHOW_PRODUCTS, payload: response.data})
      })
        }
    } catch (error) {
        throw new Error(error.message);
    }
}   

export const getProductName = (name) => {
    return ({ type: GET_PRODUCT_NAME,  payload: name})
};


export const getProductDetail = (id) => {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        axios.get(`${ENDPOINTTTT}/${id}`)
          .then((response) => {
            dispatch({ type: GET_PRODUCT_DETAIL, payload: response.data });
            resolve();
          })
          .catch((error) => {           
            throw new Error('Error fetching product details.'); // Lanza una nueva excepción
          });
      });
    };
  };
  

//   const validationUser = async (userData) => {
//     try {
//        const { email, password } = userData;      
//        const URL = 'http://localhost:3001/user/login/';
//        const {data} = await axios(URL + `?email=${email}&password=${password}`)
//        const { access } = data;     
//        setAccess(access);
//        if(!access) throw Error()
//        access && navigate('/home');
//     } catch (error) {
//        alert('Revise sus credenciales de acceso' )
//     }
//  }

export const addProduct = (product) => {
  return async (dispatch) => {
    try {
      await axios.post(`${ENDPOINT}product`, product);
      return dispatch({ type: ADD_PRODUCT, payload: product });
    } catch (error) {
      return error.message;
    }
  };
};

export const addCategory = (category) => {
  return async (dispatch) => {
    try {
      await axios.post(`${ENDPOINT}category`, category);
      return dispatch({ type: ADD_CATEGORY, payload: category });
    } catch (error) {
      return error.message;
    }
  };
};

export const getCategory = () => { 

  try {
      return async(dispatch) => {
          await axios.get(`${ENDPOINT}category`, category)
          .then(response => {                
          if(!response.data) throw Error('¡The category does not exist!');
          return dispatch({ type: GET_CATEGORY, payload: response.data})
    })
      }
  } catch (error) {
      throw new Error(error.message);
  }
}

export const addProvider = (provider) => {
  return async (dispatch) => {
    try {
      await axios.post(`${ENDPOINT}provider`, provider);
      return dispatch({ type: ADD_PROVIDER, payload: provider });
    } catch (error) {
      return error.message;
    }
  };
};

export const addRole = (role) => {
  return async (dispatch) => {
    try {
      await axios.post(`${ENDPOINT}role`, role);
      return dispatch({ type: ADD_ROLE, payload: role });
    } catch (error) {
      return error.message;
    }
  };
};