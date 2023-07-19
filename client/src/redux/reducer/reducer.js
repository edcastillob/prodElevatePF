import { ADD_CATEGORY, ADD_PRODUCT, ADD_PROVIDER, ADD_ROLE, GET_CATEGORY, GET_PRODUCT_DETAIL, GET_PRODUCT_NAME, SHOW_PRODUCTS } from "../actions/types";

const initialState = {
  products: [],
  productsFiltered: [],
  productDetail:[],
  category:[],
  provider:[],
  role:[],
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

      case ADD_CATEGORY:
      return {
        ...state,
        category: [...state.category, payload]        
      };
      case GET_CATEGORY:
      return {
        ...state,
        category: actions.payload,
      };

      case ADD_PROVIDER:
        return {
          ...state,
          provider: [...state.provider, payload]        
        };  
        case ADD_ROLE:
      return {
        ...state,
        role: [...state.role, payload]        
      };
    default:
      return state;
  }
}

export default reducer;
