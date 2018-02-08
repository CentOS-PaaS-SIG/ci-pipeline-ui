import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPipelineLatestrun } from '../actions';

class PipelineLatestrun extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPipelineLatestrun(id);
  }
  render(){
    return(
      <div>
        <h3> Pipeline latest run details </h3>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {pipelines: state.pipelines};
}

export default connect(mapStateToProps, { fetchPipelineLatestrun } )(PipelineLatestrun);
