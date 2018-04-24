import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipelineRunNodes } from '../actions';
import Clpsb from './clpsb';
import Timeline from './timeline';


var CONFIG = require("../constants/config")


class PipelineTimeline extends Component {
  componentWillMount() {
    console.log(this.props.match.params.id);
    let pipelineName = this.props.match.params.id;
    let runid = this.props.match.params.runid;
    this.props.fetchPipelineRunNodes(pipelineName, runid);
  }
  render(){
    console.log(this.props);
    if(this.props.pipelines.pipelinerunnodes){
      return (
        <div className="container">
          <Timeline nodes={this.props.pipelines.pipelinerunnodes}> </Timeline>
          <Clpsb> </ Clpsb>
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

//export default PipelineTimeline;

function mapStateToProps(state){
  return {pipelines: state.pipelines};
}

export default connect(mapStateToProps, { fetchPipelineRunNodes })(PipelineTimeline);
