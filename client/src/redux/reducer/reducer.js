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
  ADD_CART,
  UPDATE_CART,
  DELETE_CART,
  UPDATE_CART_STATE
} from "../actions/types";
import { updateStoredCart } from "../../components/Cart/cartUtils"
const initialState = {
  products: [],
  productsFiltered: [],
  productDetail: [],
  category: [],
  provider: [],
  user: [],
  role: [],
  cart: [], // Carrito agregado al estado inicial
  cartItems: [],
};

function reducer(state = initialState, action) {
  const { type, payload } = action; // Desestructuración del objeto action

  switch (type) {
    case SHOW_PRODUCTS:
      return {
        ...state,
        products: payload,
        productDetail: [...payload],
      };
    case GET_PRODUCT_NAME:
      const filterProd = [...state.products];
      const searchNotCsensitive = payload.toLowerCase();
      const filteredProducts = filterProd.filter(
        (prod) => prod.name.toLowerCase().includes(searchNotCsensitive)
      );
      return {
        ...state,
        productsFiltered: filteredProducts,
      };
    case GET_PRODUCT_DETAIL:
      console.log(payload);
      return {
        ...state,
        productDetail: payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
      };
    case ADD_CATEGORY:
      return {
        ...state,
        category: [...state.category, payload],
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
      };
    case ADD_PROVIDER:
      return {
        ...state,
        provider: [...state.provider, payload],
      };
    case GET_PROVIDER:
      return {
        ...state,
        provider: payload,
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
      console.log(payload);
      return {
        ...state,
        user: [...state.user, payload],
      };
      case UPDATE_CART:
        const updatedCart = state.cart.map((product) =>
          product.id === payload.id ? { ...product, quantity: payload.quantity, subtotalitem: payload.subtotalitem } : product
        );
        updateStoredCart(updatedCart); // Guardar el carrito en localStorage al actualizarlo
        return { ...state, cart: updatedCart };
        
      case ADD_CART:
        return {
          ...state,
          cart: [...state.cart, action.payload], // Agregar el producto al carrito existente
        };
      case DELETE_CART:
        return {
          ...state,
          cart: state.cart.filter((product) => product.id !== payload), // Eliminar el producto del carrito
        };
      case UPDATE_CART_STATE:
        return {
          ...state,
          cart: payload,
        };
    default:
      return state;
  }
}

export default reducer;
