import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import ProductCart from './components/productCart';
import PricePayable from './components/pricePayable';

import {
  setPage,
} from './store/actions';

const CartList = (props) => {
  const { setPage } = props;

  useEffect(() => {
    setPage('cart');
  }, []);

  return (
    <Container className="mt-3" fluid>
      <Row>
        <Col lg={8} sm={12}>
          <Row>
            <ProductCart />
          </Row>
        </Col>
        <Col>
          <PricePayable />
        </Col>
      </Row>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setPage: (page) => dispatch(setPage(page)),
});

export default connect(null, mapDispatchToProps)(CartList);
