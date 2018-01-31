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
    if (!pipelines){
      return (
        <div>
          Pipeline Runs
        </div>
      )
    }
    else{
      return (
        <div>
  		    {this.renderPipelineRuns()}
        </div>
      );


      //return (
      //  <div>
    //      <h4> Name of pipeline:  </ h4>
    //    </div>
    //  )
    }
  }
}


function mapStateToProps({ pipelines }, ownProps){
  return { pipelines };
}

export default connect(mapStateToProps, { fetchPipelineRuns })(PipelineRuns);
