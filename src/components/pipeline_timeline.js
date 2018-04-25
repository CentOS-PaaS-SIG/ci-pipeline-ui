import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipelineRunNodes } from '../actions';
import Clpsb from './clpsb';
import Timeline from './timeline';


var CONFIG = require("../constants/config")


class PipelineTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
        'pipelineName': this.props.match.params.id,
        'runId': this.props.match.params.runid,
      }
    this.testClick = this.testClick.bind(this);
  }
  componentWillMount() {
    //console.log(this.props.match.params.id);
    let pipelineName = this.props.match.params.id;
    let runid = this.props.match.params.runid;
    this.props.fetchPipelineRunNodes(pipelineName, runid);
  }

  testClick(nodeId){
    console.log("clicked");
    this.setState({
        'pipelineName': this.props.match.params.id,
        'runId': this.props.match.params.runid,
        'nodeId': nodeId
      }
    );
    //console.log(nodeId);
    //console.log(this.props);
    //console.log(this.state);
  }

  renderNodes(){
    return _.map(this.props.pipelines.pipelinerunnodes, node => {
      console.log(node);
      return(
        <div className="entry" key={node.id} onClick={()=>this.testClick(node.id)}>
          {node.displayName}
        </div>
      );
    });
  }

  render(){
    //console.log(this.props);
    if(this.props.pipelines.pipelinerunnodes){

      return (
        <div className="container">
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
          <Clpsb pipelineName={this.state.pipelineName} runId={this.state.runId} nodeId={this.state.nodeId}> </ Clpsb>
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

function mapStateToProps(state){
  return {pipelines: state.pipelines};
}

export default connect(mapStateToProps, { fetchPipelineRunNodes })(PipelineTimeline);
