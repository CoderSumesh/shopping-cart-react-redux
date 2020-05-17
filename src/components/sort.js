import React from 'react';
import { connect } from 'react-redux';
import {  Row, Col } from 'react-bootstrap';

import {
  SORT_HIGH_LOW,
  SORT_LOW_HIGH,
  SORT_DISCOUNT,
  sortHighLow,
  sortLowHigh,
  sortDiscount,
} from '../store/actions';

const Sort = (props) => {
  const { sortType, sortHighLow, sortLowHigh, sortDiscount } = props;

  return (
    <>
      <Row className="justify-content-start">
        <Col>
          <ul className="sort-options">
            <li>
              <h6>Sort by</h6>
            </li>
            <li
              onClick={sortHighLow}
              className={`${sortType === SORT_HIGH_LOW && 'active'} pl-3`}
            >
              <span>Price -- High Low</span>
            </li>
            <li
              onClick={sortLowHigh}
              className={`${sortType === SORT_LOW_HIGH && 'active'} pl-3`}
            >
              <span>Price -- Low High</span>
            </li>
            <li
              onClick={sortDiscount}
              className={`${sortType === SORT_DISCOUNT && 'active'} pl-3`}
            >
              <span>Discount</span>
            </li>
          </ul>
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
  return ({
  sortHighLow: () => dispatch(sortHighLow()),
  sortLowHigh: () => dispatch(sortLowHigh()),
  sortDiscount: () => dispatch(sortDiscount()),
})};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
