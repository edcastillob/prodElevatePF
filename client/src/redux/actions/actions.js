import {
  SHOW_PRODUCTS,
  GET_PRODUCT_NAME,
  GET_PRODUCT_DETAIL,
  ADD_PRODUCT,
  ADD_CATEGORY,
  ADD_PROVIDER,
  GET_CATEGORY,
  ADD_ROLE,
  ADD_USER,
  GET_PROVIDER,
  LOGIN,
  ADD_CART,
  UPDATE_CART,
  DELETE_CART,
  UPDATE_CART_STATE,
} from "./types";
import axios from "axios";
import { ENDPOINT } from "../../components/endpoint/ENDPOINT";
import { updateStoredCart } from "../../components/Cart/cartUtils";
export const showProducts = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(`${ENDPOINT}product`);
      console.log(data);
      return dispatch({ type: SHOW_PRODUCTS, payload: data });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductName = (name) => {
  return { type: GET_PRODUCT_NAME, payload: name };
};

export const getProductDetail = (id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${ENDPOINT}productid/${id}`)
        .then((response) => {
          console.log(response.data);
          dispatch({ type: GET_PRODUCT_DETAIL, payload: response.data });
          resolve();
        })
        .catch((error) => {
          throw new Error("Error fetching product details.");
        });
    });
  };
};

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
    return async (dispatch) => {
      await axios.get(`${ENDPOINT}category`).then((response) => {
        if (!response.data) throw Error("The category does not exist!");
        return dispatch({ type: GET_CATEGORY, payload: response.data });
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

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

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      await axios.post(`${ENDPOINT}user`, user);
      return dispatch({ type: ADD_USER, payload: user });
    } catch (error) {
      return error.message;
    }
  };
};

export const getProvider = () => {
  try {
    return async (dispatch) => {
      await axios.get(`${ENDPOINT}provider`).then((response) => {
        if (!response.data) throw Error("The provider does not exist!");
        return dispatch({ type: GET_PROVIDER, payload: response.data });
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = () => {
  try {
    return async (dispatch) => {
      await axios.get(`${ENDPOINT}login`).then((response) => {
        console.log(response.data);
        if (!response.data) throw Error("The user does not exist!");
        return dispatch({ type: LOGIN, payload: response.data });
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCart = (product) => (dispatch, getState) => {
  const cart = getState().cart;
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // Si el producto ya está en el carrito, actualizamos la cantidad
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
    );
    dispatch(updateCartState(updatedCart));
  } else {
    // Si el producto no está en el carrito, lo agregamos
    dispatch({
      type: ADD_CART,
      payload: product,
    });
  }

  // Guardar el carrito en localStorage utilizando la función updateStoredCart
  updateStoredCart(cart);
};

export const updateCart = (id, quantity, price, subtotalitem) => {
  return {
    type: UPDATE_CART,
    payload: {
      id,
      quantity,
      price,
      subtotalitem,
    },
  };
};
export const updateCartState = (cart) => {
  return {
    type: UPDATE_CART_STATE,
    payload: cart,
  };
};
export const deleteCart = (productId) => {
  return {
    type: 'DELETE_CART',
    payload: productId,
  };
};