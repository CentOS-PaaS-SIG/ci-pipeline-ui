import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import Test from './test';
var CONFIG = require("../constants/config")
import { fetchPipelineRunNodeSteps }  from '../actions';


class Clpsb extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.nodeId != nextProps.nodeId ){
      let pipelineName = nextProps.pipelineName
      let runId = nextProps.runId;
      let nodeId = nextProps.nodeId;
      this.props.fetchPipelineRunNodeSteps(pipelineName, runId, nodeId);
      return true;
    }
    return true
  }

  renderSteps(){
    return _.map(this.props.pipelines.pipelinenodesteps, step => {
      //onsole.log(step);
      return(
        <Collapsible key={step.id} trigger={step.displayName}>
          <p>This is the collapsible content. It can be any element or React component you like.</p>
          <p>It can even be another Collapsible component. Check out the next section!</p>
        </Collapsible>
      );
    });
  }

  render(){
      //console.log("Inside render");
      //console.log(this.props.pipelines);
      if (this.props.pipelines.pipelinenodesteps){
        return(
          <div>
            {this.renderSteps()}
          </div>
        );
      }
      else{
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
}


function mapStateToProps(state){
  return {pipelines: state.pipelines};
}

export default connect(mapStateToProps, { fetchPipelineRunNodeSteps })(Clpsb);
