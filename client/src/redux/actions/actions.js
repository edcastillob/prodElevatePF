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
  ADD_TO_CART,
  CALCULE_TOTALS,
  REMOVE_TO_CART,
  DECREMENT_CART,
  INCREMENT_CART,
  CLEAR_CART,
  EDIT_PRODUCT,
  ADD_FAV,
  REMOVE_FAV,
  GET_CATEGORY_ID,
  EDIT_CATEGORY,
  GET_PROVIDER_ID,
  EDIT_PROVIDER,
  PRICE_HIGHER_LOWER,
  PRICE_LOWER_HIGHER,
  FILTER_NAME_ASC,
  FILTER_NAME_DESC,
  DELETE_PRODUCT,
  DELETE_CATEGORY,
  DELETE_PROVIDER,
  GET_ALL_USERS,
  DELETE_USERS,
  EDIT_USERS,
  GET_USER_ID,
} from "./types";
import axios from "axios";
import { ENDPOINT } from "../../components/endpoint/ENDPOINT";

import { toast } from "react-toastify";

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

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await axios.delete(`${ENDPOINT}product/${productId}`);
    dispatch({ type: DELETE_PRODUCT, payload: productId });
  } catch (error) {
    console.error("Error deleting product:", error);
    return error.message;
  }
};

export const editProduct = (productId, changeProduct) => {
  return async (dispatch) => {
    try {
      await axios.put(`${ENDPOINT}product/${productId}`, changeProduct);
      return dispatch({
        type: EDIT_PRODUCT,
        payload: { productId, changeProduct },
      });
    } catch (error) {
      return error.message;
    }
  };
};

export const getUsers = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(`${ENDPOINT}user`);
      console.log(data);
      return dispatch({ type: GET_ALL_USERS, payload: data });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteUsers = (userId) => async (dispatch) => {
  try {
    await axios.delete(`${ENDPOINT}user/${userId}`);
    dispatch({ type: DELETE_USERS, payload: userId });
  } catch (error) {
    console.error("Error deleting user:", error);
    return error.message;
  }
};
export const editUser = (userId, changeUser) => {
  return async (dispatch) => {
    try {
      await axios.put(`${ENDPOINT}user/${userId}`, changeUser);
      return dispatch({
        type: EDIT_USERS,
        payload: { userId, changeUser },
      });
    } catch (error) {
      return error.message;
    }
  };
};
export const getUserId = (id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${ENDPOINT}user/${id}`)
        .then((response) => {
          console.log(response.data);
          dispatch({ type: GET_USER_ID, payload: response.data });
          resolve();
        })
        .catch((error) => {
          throw new Error("Error fetching user details.");
        });
    });
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
export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    await axios.delete(`${ENDPOINT}category/${categoryId}`);
    dispatch({ type: DELETE_CATEGORY, payload: categoryId });
  } catch (error) {
    console.error("Error deleting category:", error);
    return error.message;
  }
};

export const getCategory = () => {
  try {
    return async (dispatch) => {
      await axios.get(`${ENDPOINT}category`).then((response) => {
        if (!response.data) throw Error("¡The category does not exist!");
        return dispatch({ type: GET_CATEGORY, payload: response.data });
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCategoryId = (id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${ENDPOINT}category/${id}`)
        .then((response) => {
          console.log(response.data);
          dispatch({ type: GET_CATEGORY_ID, payload: response.data });
          resolve();
        })
        .catch((error) => {
          throw new Error("Error fetching category details.");
        });
    });
  };
};

export const categoryEdit = (categoryId, editCategory) => {
  return async (dispatch) => {
    try {
      await axios.put(`${ENDPOINT}category/${categoryId}`, editCategory);
      return dispatch({
        type: EDIT_CATEGORY,
        payload: { categoryId, editCategory },
      });
    } catch (error) {
      return error.message;
    }
  };
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
export const deleteProvider = (providerId) => async (dispatch) => {
  try {
    await axios.delete(`${ENDPOINT}provider/${providerId}`);
    dispatch({ type: DELETE_PROVIDER, payload: providerId });
  } catch (error) {
    console.error("Error deleting provider:", error);
    return error.message;
  }
};
export const getProviderId = (id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${ENDPOINT}provider/${id}`)
        .then((response) => {
          console.log(response.data);
          dispatch({ type: GET_PROVIDER_ID, payload: response.data });
          resolve();
        })
        .catch((error) => {
          throw new Error("Error fetching provider");
        });
    });
  };
};

export const editProvider = (providerId, editProvider) => {
  return async (dispatch) => {
    try {
      await axios.put(`${ENDPOINT}provider/${providerId}`, editProvider);
      return dispatch({
        type: EDIT_PROVIDER,
        payload: { providerId, editProvider },
      });
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
        if (!response.data) throw Error("¡The provider does not exist!");
        return dispatch({ type: GET_PROVIDER, payload: response.data });
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = (userData) => {
  try {
    return async (dispatch) => {
      const response = await axios.post(`${ENDPOINT}login`, userData);
      if (response.data) {
        const user = response.data.User;
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();
        return dispatch({ type: LOGIN, payload: user });
      }
      throw new Error("Credenciales inválidas");
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = () => {
  try {
    return async (dispatch) => {
      localStorage.removeItem("user");
      return dispatch({ type: LOGIN, payload: null });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

//Cart
export const addToCart = (product) => {
  return function (dispatch) {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
    toast.success(`${product.name} add to cart`, {
      position: "bottom-left",
    });

    return {
      type: ADD_TO_CART,
      payload: product,
    };
  };
};

export const calculateTotals = () => {
  return {
    type: CALCULE_TOTALS,
  };
};

export const removeToCart = (product) => {
  return function (dispatch) {
    dispatch({
      type: REMOVE_TO_CART,
      payload: product,
    });
    toast.error(`${product.name} remove from de cart`, {
      position: "bottom-left",
    });

    return {
      type: REMOVE_TO_CART,
      payload: product,
    };
  };
};

export const decrementToCart = (product) => {
  return function (dispatch) {
    dispatch({
      type: DECREMENT_CART,
      payload: product,
    });
    toast.info(` Decrement ${product.name} cart quantity`, {
      position: "bottom-left",
    });

    return {
      type: DECREMENT_CART,
      payload: product,
    };
  };
};

export const incrementToCart = (product) => {
  return {
    type: INCREMENT_CART,
    payload: product,
  };
};
export const clearCart = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_CART,
    });
    toast.error(`The cart is clear`, {
      position: "bottom-left",
    });

    return {
      type: CLEAR_CART,
    };
  };
};

export const addFav = (product) => {
  const endpoint = "http://localhost:3001/favorite";
  return async (dispatch) => {
    try {
      console.log(product);
      const { data } = await axios.post(endpoint, product);
      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

export const removeFav = (id) => {
  const endpoint = `http://localhost:3001/favorite/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);
      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

//Filter

export const priceHigherLower = () => {
  const endpoint = "http://localhost:3001/filter/price/higher-lower";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: PRICE_HIGHER_LOWER,
        payload: data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

export const priceLowerHigher = () => {
  const endpoint = "http://localhost:3001/filter/price/lower-higher";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: PRICE_LOWER_HIGHER,
        payload: data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

export const filterNameAsc = () => {
  const endpoint = "http://localhost:3001/filter/name/asc";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: FILTER_NAME_ASC,
        payload: data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};

export const filterNameDesc = () => {
  const endpoint = "http://localhost:3001/filter/name/desc";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: FILTER_NAME_DESC,
        payload: data,
      });
    } catch (error) {
      window.alert(error);
    }
  };
};
