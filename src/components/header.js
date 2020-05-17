import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';

import { connect } from 'react-redux';

import { searchProduct } from '../store/actions';

const Header = (props) => {
  const { cart, currentPage, searchProduct } = props;

  const [showSearch, setSearch] = useState(false);

  const cartCount = cart.reduce((r, i) => r + i.count, 0);

  const handleSearchButton = () => {
    setSearch(!showSearch);
    searchProduct('');
  };

  return (
    <Navbar bg="primary" variant="dark">
      <NavLink to="/list">
        <Navbar.Brand>
          <i className="fa fa-star text-warning"></i>
        </Navbar.Brand>
      </NavLink>
      <Nav className="mr-auto"></Nav>
      <Form inline>
        {showSearch && (
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2 header-search"
            style={{ width: 'auto' }}
            onChange={(event) => searchProduct(event.currentTarget.value)}
          />
        )}
        {currentPage === 'list' && (
          <>
            <span className="fa-stack">
              <i
                onClick={handleSearchButton}
                className="fa fa-search fa-stack-2x text-white"
                style={{ cursor: 'pointer' }}
              ></i>
            </span>

            <NavLink to="/cart">
              <span className="fa-stack  has-badge" data-count={cartCount}>
                <i className="fa fa-shopping-cart fa-stack-2x text-white"></i>
              </span>
            </NavLink>
          </>
        )}
      </Form>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  const { cart, currentPage } = state;
  return { cart, currentPage };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProduct: (search) => dispatch(searchProduct(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
