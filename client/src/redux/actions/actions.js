import { SHOW_PRODUCTS, GET_PRODUCT_NAME, GET_PRODUCT_DETAIL } from "./types";
import axios from "axios";

const ENDPOINT = 'https://fakestoreapi.com/products';


export const showProducts = () => { 

    try {
        return async(dispatch) => {
            axios.get(ENDPOINT)
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
        axios.get(`${ENDPOINT}/${id}`)
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
  


