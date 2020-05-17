import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Modal } from 'react-bootstrap';

import Filter from './components/filter';
import FilterMobile from './components/filterMobile';
import Sort from './components/sort';
import SortMobile from './components/sortMobile';
import Product from './components/product';

import {
  SORT_HIGH_LOW,
  SORT_LOW_HIGH,
  SORT_DISCOUNT,
  fetchProducts,
  setPage,
} from './store/actions';

const ProductList = (props) => {
  const {
    isLoading,
    products,
    fetchProducts,
    sortType,
    searchText,
    filterValues,
    setPage,
  } = props;
  const [productList, setProductList] = useState(products);
  const [showFilter, setFilterModal] = useState(false);
  const [showSort, setSortModal] = useState(false);

  useEffect(() => {
    setPage('list');
    fetchProducts();
  }, []);

  useEffect(() => {
    let data = [];
    switch (sortType) {
      case SORT_HIGH_LOW:
        data = products.sort((a, b) => b.price.actual - a.price.actual);
        break;

      case SORT_LOW_HIGH:
        data = products.sort((a, b) => a.price.actual - b.price.actual);
        break;

      case SORT_DISCOUNT:
        data = products.sort((a, b) => b.discount - a.discount);
        break;

      default:
        data = products;
        break;
    }

    if (searchText) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterValues && filterValues.min && filterValues.max) {
      data = data.filter(
        (item) =>
          item.price.actual >= filterValues.min &&
          item.price.actual <= filterValues.max
      );
    }

    console.log(filterValues);

    setProductList([...data]);
  }, [sortType, products, searchText, filterValues]);

  return (
    <>
      <Col md={3} className="d-none d-md-block">
        <h6>Filters</h6>
        <Filter />
      </Col>
      <Col>
        <Row className="d-none d-md-block">
          <Col>
            <Sort />
          </Col>
        </Row>
        <Row className="filter-sort-xs d-md-none">
          <Col onClick={() => setSortModal(true)}>
            <i class="fa fa-sort"></i> Sort
          </Col>
          <Col onClick={() => setFilterModal(true)}>
            <i class="fa fa-filter"></i> Filter
          </Col>
        </Row>
        <Row>
          {isLoading ? (
            <Col>Loading....</Col>
          ) : (
            <>
              {productList.length ? (
                productList.map((product) => <Product data={product} />)
              ) : (
                <Col className="text-center">No products available</Col>
              )}
            </>
          )}
        </Row>
      </Col>
      {showFilter && (
        <Modal show onHide={() => setFilterModal(false)} animation={false}>
          <FilterMobile handleClose={setFilterModal} />
        </Modal>
      )}
      {showSort && (
        <Modal show onHide={() => setSortModal(false)} animation={false}>
          <SortMobile handleClose={setSortModal} />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { isLoading, products, sortType, searchText, filterValues } = state;
  return { isLoading, products, sortType, searchText, filterValues };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  setPage: (page) => dispatch(setPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
