import React, { Component } from 'react';
import { connect } from 'react-redux';

class Footer extends Component {
  render(){

    return (
      <footer>
        Copyright &copy; RedHat.inc
      </footer>
    );
  }
}


export default connect(null)(Footer);
