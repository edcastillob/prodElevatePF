import {
  ADD_CATEGORY,
  ADD_PRODUCT,
  ADD_PROVIDER,
  ADD_ROLE,
  ADD_TO_CART,
  ADD_USER,
  CALCULE_TOTALS,
  CLEAR_CART,
  DECREMENT_CART,
  GET_CATEGORY,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_NAME,
  GET_PROVIDER,
  LOGIN,
  REMOVE_TO_CART,
  SHOW_PRODUCTS,
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
} from "../actions/types";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  favorites: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  products: [],
  productsFiltered: [],
  productDetail: [],
  category: [],
  provider: [],
  user: null,
  role: [],
  users: [],
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
      // console.log(actions.payload);
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

    case GET_CATEGORY_ID:
      console.log("Category id: ", actions.payload);
      return {
        ...state,
        category: actions.payload,
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
    case GET_PROVIDER_ID:
      // console.log("Provider id: ", actions.payload);
      return {
        ...state,
        provider: actions.payload,
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
      // console.log("reducer login: ", actions.payload);
      return {
        ...state,
        user: actions.payload,
      };

    //Cart
    case ADD_TO_CART: {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === actions.payload.id
      );

      if (itemIndex >= 0) {
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === itemIndex) {
            return {
              ...item,
              cartQuantity: item.cartQuantity + 1,
            };
          }

          return item;
        });

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        const newItem = { ...actions.payload, cartQuantity: 1 };

        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }
    }

    case CALCULE_TOTALS: {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { salePrice, cartQuantity } = cartItem;
          const itemTotal = salePrice * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      return {
        ...state,
        cartTotalAmount: total,
        cartTotalQuantity: quantity,
      };
    }
    case REMOVE_TO_CART: {
      const newCartItem = state.cartItems.filter(
        (cartItem) => cartItem.id !== actions.payload.id
      );

      return {
        ...state,
        cartItems: newCartItem,
      };
    }

    case DECREMENT_CART:
      {
        const itemIndex = state.cartItems.findIndex(
          (item) => item.id === actions.payload.id
        );

        if (state.cartItems[itemIndex].cartQuantity > 1) {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[itemIndex].cartQuantity -= 1;

          return {
            ...state,
            cartItems: updatedCartItems,
          };
        } else if (state.cartItems[itemIndex].cartQuantity === 1) {
          const newCartItem = state.cartItems.filter(
            (cartItem) => cartItem.id !== actions.payload.id
          );

          return {
            ...state,
            cartItems: newCartItem,
          };
        }
      }
      return state;

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    case EDIT_PRODUCT:
      const { productId, updatedProduct } = actions.payload;
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === productId ? { ...product, ...updatedProduct } : product
        ),
      };
    case EDIT_CATEGORY:
      const { categoryId, updatedCategory } = actions.payload;
      return {
        ...state,
        category: state.category.map((categ) =>
          categ.id === categoryId
            ? { ...category, ...updatedCategory }
            : category
        ),
      };
    case EDIT_PROVIDER:
      const { providerId, updateProvider } = actions.payload;
      return {
        ...state,
        provider: state.provider.map((prov) =>
          prov.id === providerId ? { ...provider, ...updateProvider } : provider
        ),
      };

    //Favorite

    case ADD_FAV:
      return { ...state, favorites: actions.payload };
    case REMOVE_FAV:
      return { ...state, favorites: actions.payload };

    //Filter Price

    case PRICE_HIGHER_LOWER:
      return {
        ...state,
        products: actions.payload,
      };

    case PRICE_LOWER_HIGHER:
      return {
        ...state,
        products: actions.payload,
      };

    // Filter Name

    case FILTER_NAME_ASC:
      return {
        ...state,
        products: actions.payload,
      };

    case FILTER_NAME_DESC:
      return {
        ...state,
        products: actions.payload,
      };

    case DELETE_PRODUCT:
      const updatedProducts = state.products.filter(
        (product) => product.id !== actions.payload
      );
      return {
        ...state,
        products: updatedProducts,
      };

    case DELETE_CATEGORY:
      const updatedCateg = state.category.filter(
        (cat) => cat.id !== actions.payload
      );
      return {
        ...state,
        category: updatedCateg,
      };
    case DELETE_PROVIDER:
      const updateProv = state.provider.filter(
        (cat) => cat.id !== actions.payload
      );
      return {
        ...state,
        provider: updateProv,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: actions.payload,
      };
    case DELETE_USERS:
      const updateUsers = state.users.filter(
        (user) => user.id !== actions.payload
      );
      return {
        ...state,
        users: updateUsers,
      };
    case EDIT_USERS:
      const { userId, updateUser } = actions.payload;
      return {
        ...state,
        users: state.users.map((prov) =>
          prov.id === userId ? { ...users, ...updateUser } : users
        ),
      };
    case GET_USER_ID:
      // console.log("User id: ", actions.payload);
      return {
        ...state,
        users: actions.payload,
      };
    default:
      return state;
  }
}

export default reducer;
