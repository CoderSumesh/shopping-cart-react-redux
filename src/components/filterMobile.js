import React, { useState } from 'react';
import InputRange from 'react-input-range';
import { Row, Col, Modal } from 'react-bootstrap';

import { connect } from 'react-redux';

import 'react-input-range/lib/css/index.css';

import { filterProduct } from '../store/actions';

const FilterMobile = (props) => {
  const { handleClose, filterValues, filterProduct } = props;

  const [value, setValue] = useState(filterValues);

  const handleApply = () => {
    filterProduct(value);
    handleClose(false);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Filter Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>&#8377;{value.min}</Col>
          <Col className="text-right">&#8377;{value.max}</Col>
        </Row>
        <Row>
          <Col>
            <InputRange
              maxValue={100000}
              minValue={1000}
              value={value}
              formatLabel={() => ''}
              onChange={(val) => setValue(val)}
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">Price</Col>
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
  const { filterValues } = state;
  return { filterValues };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterProduct: (filterValues) => dispatch(filterProduct(filterValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterMobile);
