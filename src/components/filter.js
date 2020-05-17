import React, { useState } from 'react';
import InputRange from 'react-input-range';
import { Row, Col, Button } from 'react-bootstrap';

import { connect } from 'react-redux';

import 'react-input-range/lib/css/index.css';

import { filterProduct } from '../store/actions';

const Filter = (props) => {
  const { filterValues, filterProduct } = props;

  const [value, setValue] = useState(filterValues);

  const handleApply = () => {
    filterProduct(value);
  };

  return (
    <>
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
      <Row>
        <Col className="text-center pt-2">
          <Button
            variant="primary"
            size="md"
            style={{ borderRadius: '23px', minWidth: '100px' }}
            onClick={handleApply}
          >
            Apply
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
