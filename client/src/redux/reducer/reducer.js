import { ADD_PRODUCT, GET_PRODUCT_DETAIL, GET_PRODUCT_NAME, SHOW_PRODUCTS } from "../actions/types";

const initialState = {
  products: [],
  productsFiltered: [],
  productDetail:[],
};

function reducer(state = initialState, actions) {
  switch (actions.type) {
    case SHOW_PRODUCTS:
      return {
        ...state,
        products: actions.payload,
        productDetail: [...actions.payload]
      };

    case GET_PRODUCT_NAME:
      const filterProd = [...state.products]; 
      const searchNotCsensitive = actions.payload.toLowerCase(); 
      const filteredProducts = filterProd.filter((prod) =>
        prod.title.toLowerCase().includes(searchNotCsensitive)
      );
      return {
        ...state,
        productsFiltered: filteredProducts,
      };

    case GET_PRODUCT_DETAIL:
        
      console.log(actions.payload)  
      // const filteredProduct = filterProduct.filter((prod) => prod.id === actions.payload);
      return {
        ...state,
        productDetail: actions.payload,
      };
    
      case ADD_PRODUCT:
        return{
          ...state,
          product: [...state.products, payload]
        }

    default:
      return state;
  }
}

export default reducer;
