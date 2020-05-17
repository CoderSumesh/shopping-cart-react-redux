import * as actionTypes from './actions';

const initialState = {
  isLoading: true,
  products: [],
  cart: [],
  sortType: '',
  searchText: '',
  filterValues: { min: 1000, max: 100000 },
  currentPage: 'list',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE: {
      return { ...state, currentPage: action.payload };
    }

    case actionTypes.FETCH_REQUEST: {
      return { ...state, isLoading: true };
    }

    case actionTypes.FETCH_SUCCESS: {
      return { ...state, isLoading: false, products: action.payload };
    }

    case actionTypes.SEARCH_PRODUCT: {
      console.log(action.payload);
      return { ...state, searchText: action.payload };
    }

    case actionTypes.FILTER_PRODUCT: {
      return { ...state, filterValues: action.payload };
    }

    case actionTypes.ADD_TO_CART: {
      const { cart, products } = state;
      const added = cart.findIndex((item) => item.name === action.payload);
      if (added > -1) {
        cart[added].count = cart[added].count + 1;
      } else {
        const newItem = products.find((item) => item.name === action.payload);
        newItem.count = 1;
        cart.push(newItem);
      }
      return { ...state, cart: [...cart] };
    }

    case actionTypes.REMOVE_FROM_CART: {
      const { cart } = state;
      return {
        ...state,
        cart: cart.filter((item) => item.name !== action.payload),
      };
    }

    case actionTypes.INCREMENT_ITEM: {
      const { cart } = state;
      const item = cart.findIndex((item) => item.name === action.payload);

      cart[item].count = cart[item].count + 1;
      return {
        ...state,
        cart: [...cart],
      };
    }

    case actionTypes.DECREMENT_ITEM: {
      let { cart } = state;
      const item = cart.findIndex((item) => item.name === action.payload);
      if (cart[item].count > 1) {
        cart[item].count = cart[item].count - 1;
      } else {
        cart = cart.filter((item) => item.name !== action.payload);
      }
      return {
        ...state,
        cart: [...cart],
      };
    }

    case actionTypes.SORT_HIGH_LOW: {
      return { ...state, sortType: actionTypes.SORT_HIGH_LOW };
    }

    case actionTypes.SORT_LOW_HIGH: {
      return { ...state, sortType: actionTypes.SORT_LOW_HIGH };
    }

    case actionTypes.SORT_DISCOUNT: {
      return { ...state, sortType: actionTypes.SORT_DISCOUNT };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
