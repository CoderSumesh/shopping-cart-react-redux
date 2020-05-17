import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

import { connect } from 'react-redux';

import {
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
} from '../store/actions';

const ProductCart = (props) => {
  const { cart, removeFromCart, incrementCartItem, decrementCartItem } = props;

  return (
    <Col sm={12}>
      {cart.map((item) => (
        <Card className="mb-3">
          <Card.Body>
            <Row>
              <Col xs={4} md={3}>
                <img
                  className="card-img-top"
                  src={item.image}
                  alt={item.name}
                />
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <h6>{item.name}</h6>
                        <p className="m-0">
                          <span>&#8377;{item.price.actual}</span>
                          &nbsp;&nbsp;
                          <strike>{item.price.display}</strike>
                          &nbsp;&nbsp;
                          <span className="text-success">
                            {item.discount}% off
                          </span>
                        </p>
                      </Col>
                      <Col md={6} className="align-self-center">
                        <div>
                          {/* <Form.Row> */}
                          <Button
                            variant="outline-dark"
                            onClick={() => decrementCartItem(item.name)}
                            style={{ borderRadius: '50%' }}
                          >
                            <i className="fa fa-minus" />
                          </Button>
                          <Button
                            disabled
                            variant="outline-dark"
                            className="ml-2 mr-2"
                          >
                            {item.count}
                          </Button>
                          <Button
                            variant="outline-dark"
                            onClick={() => incrementCartItem(item.name)}
                            style={{ borderRadius: '50%' }}
                          >
                            <i className="fa fa-plus" />
                          </Button>
                          {/* </Form.Row> */}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={3} className="align-self-center">
                    <b
                      onClick={() => removeFromCart(item.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      REMOVE
                    </b>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      {!!!cart.length && <h6 className="text-center">Your cart is empty!</h6> }
    </Col>
  );
};

const mapStateToProps = (state) => {
  const { cart } = state;
  return { cart };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (name) => dispatch(removeFromCart(name)),
    incrementCartItem: (name) => dispatch(incrementCartItem(name)),
    decrementCartItem: (name) => dispatch(decrementCartItem(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCart);
