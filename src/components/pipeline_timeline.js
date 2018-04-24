import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';


var CONFIG = require("../constants/config")


class PipelineTimeline extends Component {

  render(){
    console.log(this.props);
      return (
        <div>
          welcome to pipeline timeline
        </div>
      );
    }
}

export default PipelineTimeline;
