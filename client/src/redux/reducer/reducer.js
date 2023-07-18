import { GET_PRODUCT_DETAIL, GET_PRODUCT_NAME, SHOW_PRODUCTS } from "../actions/types";

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
    
      return {
        ...state,
        productDetail: actions.payload,
      };

    default:
      return state;
  }
}

export default reducer;
