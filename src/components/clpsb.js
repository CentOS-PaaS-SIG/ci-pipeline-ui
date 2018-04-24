import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import Test from './test';
var CONFIG = require("../constants/config")


class Clpsb extends Component {

  render(){
      return (
      <div>
        <Collapsible trigger="something">
          <p>This is the collapsible content. It can be any element or React component you like.</p>
          <p>It can even be another Collapsible component. Check out the next section!</p>
        </Collapsible>
        <Collapsible trigger="something">
          <Test></Test>
        </Collapsible>
      </div>
      );
    }
}

export default Clpsb;
