import React, { useState } from 'react';
import { Row, Col, Modal, Form } from 'react-bootstrap';

import { connect } from 'react-redux';

import 'react-input-range/lib/css/index.css';

import {
  SORT_HIGH_LOW,
  SORT_LOW_HIGH,
  SORT_DISCOUNT,
  sortProduct,
} from '../store/actions';

const SortMobile = (props) => {
  const { handleClose, sortType, sortProduct } = props;

  const [value, setValue] = useState(sortType);

  const handleChange = (event) => {
    setValue(event.currentTarget.value);
  };

  const handleApply = () => {
    sortProduct(value);
    handleClose(false);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Sort Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <div className="mb-3">
              <Form.Check
                name="sort-radio"
                type="radio"
                label="Price -- High Low"
                id={SORT_HIGH_LOW}
                value={SORT_HIGH_LOW}
                checked={value === SORT_HIGH_LOW}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <Form.Check
                name="sort-radio"
                type="radio"
                label="Price -- Low High"
                id={SORT_LOW_HIGH}
                value={SORT_LOW_HIGH}
                checked={value === SORT_LOW_HIGH}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <Form.Check
                name="sort-radio"
                type="radio"
                label="Discount"
                id={SORT_DISCOUNT}
                value={SORT_DISCOUNT}
                checked={value === SORT_DISCOUNT}
                onChange={handleChange}
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Row className="app-modal-actions m-0">
        <Col className="text-center" onClick={() => handleClose(false)}>
          Cancel
        </Col>
        <Col className="text-center" onClick={handleApply}>
          Apply
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  const { sortType } = state;
  return { sortType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortProduct: (type) => dispatch(sortProduct(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortMobile);
