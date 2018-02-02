import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipelineRuns }  from '../actions';


class PipelineRuns extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPipelineRuns(id);
  }
  renderPipelineRuns(){
    return _.map(this.props.pipelines.pipelineruns, pipelinerun => {
      return (
        <div key={pipelinerun.id}>
        <h4> PipelineRunId: {pipelinerun.id} </h4>
        </div>
      )
    })
  }
  render(){
    const { pipelines } = this.props;
    if (Object.keys(pipelines).length == 0){
      return (
        <div>
          <h3> Loading ... </h3>
          <img src="/static/loading.gif" alt="Smiley face" height="42" width="42">
          </img>
        </div>
      )
    }
    else{
      return (
        <div>
  		    {this.renderPipelineRuns()}
        </div>
      );
    }
  }
}


function mapStateToProps({ pipelines }, ownProps){
  return { pipelines };
}

export default connect(mapStateToProps, { fetchPipelineRuns })(PipelineRuns);
