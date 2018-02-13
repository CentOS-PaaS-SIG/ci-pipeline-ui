import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPipelines } from '../actions';

class PipelinesIndex extends Component {
  componentWillMount() {
  this.props.fetchPipelines();
  }
  renderPipelines(){
    return _.map(this.props.pipelines, pipeline => {
      return (
        <tr key={`${pipeline.id}`}>
          <td scope="row">
                {pipeline.id}
          </td>
          <td>
                {pipeline.name}
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
                <Link to={`/pipelines/${pipeline.name}/latestrun`}>
                  Latest run
                </Link>
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
                <Link to={`/pipelines/${pipeline.name}/runview`}>
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
