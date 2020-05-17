import axios from 'axios';

import data from './data';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export const SORT_HIGH_LOW = 'SORT_HIGH_LOW';
export const SORT_LOW_HIGH = 'SORT_LOW_HIGH';
export const SORT_DISCOUNT = 'SORT_DISCOUNT';

export const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
export const FILTER_PRODUCT = 'FILTER_PRODUCT';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_ITEM = 'INCREMENT_ITEM';
export const DECREMENT_ITEM = 'DECREMENT_ITEM';

export const SET_PAGE = 'SET_PAGE';

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const searchProduct = (searchText) => ({
  type: SEARCH_PRODUCT,
  payload: searchText,
});

export const filterProduct = (filterValues) => ({
  type: FILTER_PRODUCT,
  payload: filterValues,
});

export const sortProduct = (type) => ({
  type
});

export const sortHighLow = () => ({
  type: SORT_HIGH_LOW,
});

export const sortLowHigh = () => ({
  type: SORT_LOW_HIGH,
});

export const sortDiscount = () => ({
  type: SORT_DISCOUNT,
});

export const addToCart = (productName) => ({
  type: ADD_TO_CART,
  payload: productName,
});

export const removeFromCart = (productName) => ({
  type: REMOVE_FROM_CART,
  payload: productName,
});

export const incrementCartItem = (productName) => ({
  type: INCREMENT_ITEM,
  payload: productName,
});

export const decrementCartItem = (productName) => ({
  type: DECREMENT_ITEM,
  payload: productName,
});

export const fetchProductRequest = () => ({
  type: FETCH_REQUEST,
});

const fetchProductSuccess = (products) => ({
  type: FETCH_SUCCESS,
  payload: products,
});

export function fetchProducts() {
  return (dispatch) => {
    dispatch(fetchProductRequest());
    axios
      .get('https://api.jsonbin.io/b/5e8c3ad0ff9c906bdf1d5380')
      .then((res) => {
        let products;
        if (res.success) {
          products = res.items;
        } else {
          products = data;
        }

        dispatch(fetchProductSuccess(products));
      })
      .catch((err) => {
        console.error(err);
        dispatch(fetchProductSuccess(data));
      });
  };
}
