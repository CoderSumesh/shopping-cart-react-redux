import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

import { connect } from 'react-redux';

import { addToCart } from '../store/actions';

const Product = (props) => {
  const { data, addToCart } = props;

  return (
    <Col lg={3} md={4} sm={4} xs={6}>
      <Card className="mb-2">
        <img className="card-img-top" src={data.image} alt={data.name} />
        <Card.Body>
          <h6>{data.name}</h6>
          <p className="m-0">
            <span>&#8377;{data.price.actual}</span>
            &nbsp;&nbsp;
            <strike>{data.price.display}</strike>
            &nbsp;&nbsp;
            <span className="text-success">{data.discount}% off</span>
          </p>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button
            onClick={() => addToCart(data.name)}
            variant="warning"
            size="sm"
          >
            Add To Cart
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productName) => dispatch(addToCart(productName)),
  };
};

export default connect(null, mapDispatchToProps)(Product);
