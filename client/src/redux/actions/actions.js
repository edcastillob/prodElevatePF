import { SHOW_PRODUCTS, GET_PRODUCT_NAME } from "./types";
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
        console.log(error.message)
    }
}   

export const getProductName = (name) => {
    return ({ type: GET_PRODUCT_NAME,  payload: name})
};


