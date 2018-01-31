import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipelineRuns }  from '../actions';


class PipelineRuns extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    const id = this.props.match.params.id;
    console.log(id);
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
    console.log("Inside render")
    console.log(this.props);
    const { pipelines } = this.props;
    console.log(pipelines);
    if (!pipelines){
      return (
        <div>
          Pipeline Runs
        </div>
      )
    }
    else{
      console.log("inside else");
      console.log(pipelines);
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
  console.log(ownProps);
  console.log("data inside pipelines")

  return { pipelines };

}

export default connect(mapStateToProps, { fetchPipelineRuns })(PipelineRuns);
