import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import { connect } from 'react-redux';

import { searchProduct } from '../store/actions';

const calculateAmount = (items) => {
  const itemCount = items.reduce((r, i) => r + i.count, 0);
  const totalAmount = items.reduce((r, i) => r + i.price.display * i.count, 0);
  const actualAmount = items.reduce((r, i) => r + i.price.actual * i.count, 0);
  const discountAmount = totalAmount - actualAmount;

  return [itemCount, totalAmount, actualAmount, discountAmount];
};

const PricePayable = (props) => {
  const { cart } = props;

  const [
    itemCount,
    totalAmount,
    actualAmount,
    discountAmount,
  ] = calculateAmount(cart);

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">PRICE DETAILS</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>Price ({itemCount} Item)</Col>
          <Col>:</Col>
          <Col className="text-right">&#8377;{totalAmount}</Col>
        </Row>
        <Row>
          <Col>Discount</Col>
          <Col>:</Col>
          <Col className="text-right">&#8377;{discountAmount}</Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col><b>Total Payable</b></Col>
          <Col>:</Col>
          <Col className="text-right">&#8377;{actualAmount}</Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

const mapStateToProps = (state) => {
  const { cart } = state;
  return { cart };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProduct: (search) => dispatch(searchProduct(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PricePayable);
