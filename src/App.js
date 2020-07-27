import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Store from './store';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import "./style.scss";

import Routes from './Routes';
import Header from './components/header';

class App extends Component {
  constructor(props) {
    super(props);
    this.nodes = [];
  }

  onUpdate = (data) => {
    this.nodes = [...data];
  };

  saveData = () => {
    console.log(this.nodes);
  };

  render() {
    return (
      <Store>
        <Router basename="product">
          <Container fluid>
            <Row>
              <Col className="p-0">
                <Header />
              </Col>
            </Row>
            <Row
              className="app-container"
              style={{ height: 'calc(100vh - 80px)', overflowX: 'auto' }}
            >
              <Routes />
            </Row>
            <Row>
              <Col className="p-0">
                <div className="bg-primary text-white text-center">
                  &copy;copyright
                </div>
              </Col>
            </Row>
          </Container>
        </Router>
      </Store>
    );
  }
}

export default App;
