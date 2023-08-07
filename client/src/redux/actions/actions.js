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
  DELETE_PRODUCT,
  DELETE_CATEGORY,
  DELETE_PROVIDER,
  GET_ALL_USERS,
  DELETE_USERS,
  EDIT_USERS,
  GET_USER_ID,
  FILTER_DATA,
  FILTER_NAME,
  GET_USER_REVIEWS,
  GET_ALL_REVIEWS,
  ADD_REVIEW,
  GET_COMMENTS_BY_PRODUCT,
  CREATE_COMMENT,
  CREATE_REPLY,

  GET_USER_EMAIL,
  GET_ROLE,
  GET_USER_SYSTEM_LOG,
  SHOW_PRODUCTS_INACTIVE,
  ACTIVE_PRODUCT,
  FILTER_REVIEWS
  POST_VERIFY_USER,
} from "./types";
import axios from "axios";
import { ENDPOINT } from "../../components/endpoint/ENDPOINT";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showProducts = (page) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(`${ENDPOINT}product?page=${page}`);

      console.log(data.data);
      return dispatch({
        type: SHOW_PRODUCTS,
        payload: {
          data: data.data,
          totalPages: data.totalPages,
          currentPage: page,
        },
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
export const showProductsInactive = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(`${ENDPOINT}productinactive`);
      return dispatch({ type: SHOW_PRODUCTS_INACTIVE, payload: data });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
export const activeProduct = (productId) => async (dispatch) => {
  console.log("productId: ", productId);
  try {
    const response = await axios.put(`${ENDPOINT}productactive/${productId}`);
    console.log("Respuesta del backend:", response.data);
  } catch (error) {
    console.error("Error al activar el producto:", error);
  }
};

export const getProductDetail = (id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${ENDPOINT}productid/${id}`)
        .then((response) => {
          // console.log(response.data);
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
      // console.log(data);
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
  console.log("aqui va el change desde actions: ", changeUser);
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
          // console.log(response.data);
          dispatch({ type: GET_USER_ID, payload: response.data });
          resolve();
        })
        .catch((error) => {
          throw new Error("Error fetching user details.");
        });
    });
  };
};

export const getUserEmail = (email) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${ENDPOINT}useremail/${encodeURIComponent(email)}`)
        .then((response) => {
          // console.log('email desde actions: ',response.data);
          dispatch({ type: GET_USER_EMAIL, payload: response.data });
          resolve();
        })
        .catch((error) => {
          throw new Error("Error fetching user details.");
        });
    });
  };
};
export const getUserSystemLog = (email) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${ENDPOINT}userlog/${encodeURIComponent(email)}`)
        .then((response) => {
          // console.log('email desde actions: ',response.data);
          dispatch({ type: GET_USER_SYSTEM_LOG, payload: response.data });
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
          // console.log(response.data);
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
          // console.log(response.data);
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

export const getRole = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ENDPOINT}role`);
      const roleData = response.data;
      return dispatch({ type: GET_ROLE, payload: roleData });
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
      localStorage.removeItem("favorites");
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
    toast.success(`${product.name} add to cart`);

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
    toast.error(`${product.name} remove from de cart`);

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
    

    return {
      type: CLEAR_CART,
    };
  };
};

export const addFav = (product) => {
  const endpoint = `${ENDPOINT}favorite`;
  return async (dispatch) => {
    try {
      // console.log(product);
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
  const endpoint = `${ENDPOINT}favorite/${id}`;

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

export const priceHigherLower = (page) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(
        `${ENDPOINT}product/highest-price?page=${page}`
      );
      return dispatch({
        type: PRICE_HIGHER_LOWER,
        payload: {
          data: data.data,
          totalPages: data.totalPages,
          currentPage: page,
        },
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const priceLowerHigher = (page) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(
        `${ENDPOINT}product/lowest-price?page=${page}`
      );
      return dispatch({
        type: PRICE_LOWER_HIGHER,
        payload: {
          data: data.data,
          totalPages: data.totalPages,
          currentPage: page,
        },
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const filterNameAsc = (page) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(`${ENDPOINT}product/name?page=${page}`);
      return dispatch({
        type: FILTER_NAME,
        payload: {
          data: data.data,
          totalPages: data.totalPages,
          currentPage: page,
        },
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const filterData = (filters, page) => {
  const endpoint = `${ENDPOINT}filter/data`;
  console.log("actions filter", page);

  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, filters, {
        params: { page },
      });
      return dispatch({
        type: FILTER_DATA,
        payload: {
          data: data.data,
          totalPages: data.totalPages,
          currentPage: page,
        },
      });
    } catch (error) {
      window.alert(error);
    }
  };
};
//Reviews
export const postReview = (reviewData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${ENDPOINT}reviews/create`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error en la acción postReview:', error);
      throw new Error('Error al crear la reseña');
    }
  };
};
export const getProductReviews = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${ENDPOINT}reviews/product/${id}`);
      return dispatch({ type: GET_ALL_REVIEWS, payload: response.data });
    } catch (error) {
      console.error('Error al obtener las reseñas del producto:', error);
      
    }
  };
};
/////////// Comentarios
export const createComment = (commentData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ENDPOINT}comments`, commentData);
      dispatch({
        type: CREATE_COMMENT,
        payload: response.data,
      });
      return response.data; 
    } catch (error) {
      console.error("Error al crear el comentario:", error);
    }
  };
};

// Acción para responder a un comentario
export const createReply = (replyData) => {
  return async (dispatch) => {
    try {
      const { commentId, text, userEmail } = replyData;
      const response = await axios.put(`${ENDPOINT}comments/${commentId}/reply`, { text, userEmail });

      if (response.status === 201) {
        dispatch({
          type: CREATE_REPLY,
          payload: { reply: response.data, commentId: commentId },
        });
      } else {
        console.error("Error creating reply");
      }
    } catch (error) {
      console.error("Error al responder al comentario:", error);
    }
  };
};

// Acción para obtener los comentarios de un producto
export const getCommentsByProduct = (productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ENDPOINT}products/${productId}/comments`);
      dispatch({
        type: GET_COMMENTS_BY_PRODUCT,
        payload: response.data,
      });
      
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    }
  };
};



export const checkEmailAndRegister = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ENDPOINT}check-email`, userData);
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };
};

export const getProductsByName = (page, name) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get(
        `${ENDPOINT}product?page=${page}&name=${name}`
      );

      console.log(data.data);
      return dispatch({
        type: GET_PRODUCT_NAME,
        payload: {
          data: data.data,
          totalPages: data.totalPages,
          currentPage: page,
        },
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const filterReviews = (productId, filters) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ENDPOINT}${productId}/reviewsfilter`, { params: filters });
      const filteredReviews = response.data;
      dispatch({ type: FILTER_REVIEWS, payload: filteredReviews });
    } catch (error) {
      console.error("Error al filtrar reseñas:", error);
    }
  };
};


export const verifyUser = (userData) => {
  console.log("dates: ", userData)
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ENDPOINT}verifyUser`, userData);

      dispatch({
        type: POST_VERIFY_USER,
        payload: {
          data: response.data,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};


      