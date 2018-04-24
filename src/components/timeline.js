import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
var CONFIG = require("../constants/config")


class Timeline extends Component {

  renderNodes(){
    return _.map(this.props.nodes, node => {
      return(
        <div className="entry">
          {node.displayName}
        </div>
      );
    });
  }

  render(){
    console.log("inside Timeline render ");
    console.log(this.props);
    if(this.props.nodes){
      return (
        <div className="container">
          <div className="bar"></div>
          <div className="timeline">
            <div className="startentry">
              Start
            </div>
            {this.renderNodes()}
            <div className="endentry">
              End
            </div>
          </div>
        </div>
      );
    }
    else{
      return (
        <div className="container">
          Loading ...
        </div>
      );

    }
  }
}

export default Timeline;
