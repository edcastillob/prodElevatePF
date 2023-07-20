import {
  ADD_CATEGORY,
  ADD_PRODUCT,
  ADD_PROVIDER,
  ADD_ROLE,
  ADD_USER,
  GET_CATEGORY,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_NAME,
  GET_PROVIDER,
  LOGIN,
  SHOW_PRODUCTS,
} from "../actions/types";

const initialState = {
  products: [],
  productsFiltered: [],
  productDetail: [],
  category: [],
  provider: [],
  user: [],
  role: [],
};

function reducer(state = initialState, actions) {
  switch (actions.type) {
    case SHOW_PRODUCTS:
      return {
        ...state,
        products: actions.payload,
        productDetail: [...actions.payload],
      };

    case GET_PRODUCT_NAME:
      const filterProd = [...state.products];
      const searchNotCsensitive = actions.payload.toLowerCase();
      const filteredProducts = filterProd.filter((prod) =>
        prod.name.toLowerCase().includes(searchNotCsensitive)
      );
      return {
        ...state,
        productsFiltered: filteredProducts,
      };

    case GET_PRODUCT_DETAIL:
      console.log(actions.payload);
      // const filteredProduct = filterProduct.filter((prod) => prod.id === actions.payload);
      return {
        ...state,
        productDetail: actions.payload,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        product: [...state.products, payload],
      };

    case ADD_CATEGORY:
      return {
        ...state,
        category: [...state.category, payload],
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: actions.payload,
      };

    case ADD_PROVIDER:
      return {
        ...state,
        provider: [...state.provider, payload],
      };

    case GET_PROVIDER:
      return {
        ...state,
        provider: actions.payload,
      };
    case ADD_ROLE:
      return {
        ...state,
        role: [...state.role, payload],
      };

    case ADD_USER:
      return {
        ...state,
        user: [...state.user, payload],
      };

    case LOGIN:
      console.log(actions.payload);
      return {
        ...state,
        user: [...state.user, actions.payload],
      };
    default:
      return state;
  }
}

export default reducer;
