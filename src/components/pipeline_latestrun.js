import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPipelineLatestrun } from '../actions';

class PipelineLatestrun extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPipelineLatestrun(id);

  }

  renderLatestRun(){
    return _.map(this.props.pipelines.pipelinelatestrun, plr => {
      console.log(plr);
      return (
        <div key={plr.id}>
          <h5> Name: {plr.name}</h5>
        </div>
      )

    })
  }

  render(){
    console.log(this.props.pipelines);
    if(Object.keys(this.props.pipelines).length ==0){
      return(
        <div>
          <h3> Loading ... </h3>
          <img src="/static/loading.gif" alt="Smiley face" height="42" width="42">
          </img>
        </div>
      );
    }
    else{
      console.log("inside render else");
      console.log(this.props.pipelines.pipelinelatestrun);
      return(
        <div>
          {this.renderLatestRun()}
        </div>
      );
  /*  return(
      <div>
        <h3> Pipeline latest run details </h3>
        {this.props.pipelines.pipelinelatestrun.name}
      </div>
    );
    */
  }
  }
}

function mapStateToProps(state){
  return {pipelines: state.pipelines};
}

export default connect(mapStateToProps, { fetchPipelineLatestrun } )(PipelineLatestrun);
