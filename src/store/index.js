import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './reducer';

const initialStore = {
    isLoading: true,
    products: [],
    cart: [],
    sortType: '',
    searchText: '',
    filterValues: { min: 1000, max: 100000 },
    currentPage: 'list',
};
  

export default ({ children, initialState = initialStore }) => {
    const store = createStore(
      reducer,
      initialState,
      applyMiddleware(reduxThunk),
    );
    return <Provider store={store}>{children}</Provider>;
};
  
