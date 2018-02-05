import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPipelines } from '../actions';

class PipelinesIndex extends Component {
  componentDidMount() {
  this.props.fetchPipelines();
  }
  renderPipelines(){
    return _.map(this.props.pipelines, pipeline => {
      return (
        <tr className="pipelineindex" key={`${pipeline.id}`}>
          <td>
              <Link to="">
                {pipeline.id}
              </Link>
          </td>
          <td>
              <Link to={`/pipelines/${pipeline.name}`}>
                {pipeline.name}
              </Link>
          </td>
          <td>
              <Link to="">
                {pipeline.weatherScore}
              </Link>
          </td>
          <td>
              <button type="button" className="btn btn-default btn-sm">
                <Link to={`/pipelines/${pipeline.name}`}>
                  Details
                </Link>
              </button>
          </td>
          <td>
              <button type="button" className="btn btn-default btn-sm">
                Latest run
              </button>
          </td>
          <td>
              <button type="button" className="btn btn-default btn-sm">
                <Link to={`/pipelines/${pipeline.name}/runs`}>
                  All Runs
                </Link>
              </button>
          </td>
          <td>
              <button type="button" className="btn btn-default btn-sm">
                <Link to={`/pipelines/${pipeline.name}/runs`}>
                  Run View
                </Link>
              </button>
          </td>
        </tr>
    );
    });
  }
  render(){
    if(!this.props.pipelines){
      return(
      <tbody>
        <tr>
        <td>
          <h3> Loading ... </h3>
          <img src="/static/loading.gif" alt="Smiley face" height="42" width="42">
          </img>
        </td>
      </tr>
      </tbody>
      );
    }
    else{
    return (
      <tbody>
		    {this.renderPipelines()}
      </tbody>
    );
    }
  }
}

function mapStateToProps(state){
  return {pipelines: state.pipelines};
}


export default connect(mapStateToProps, { fetchPipelines } )(PipelinesIndex);
