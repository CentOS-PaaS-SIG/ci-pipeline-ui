import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPipelines } from '../actions';
var CONFIG = require("../constants/config")

class PipelinesIndex extends Component {

  componentWillMount() {
    this.props.fetchPipelines();
    this.intervalFun = setInterval(function(){
      this.props.fetchPipelines();
    }.bind(this), CONFIG.CACHE_TIMEOUT);
  }

  componentWillUnmount(){
    clearInterval(this.intervalFun);
  }

  renderPipelines(){
    return _.map(this.props.pipelines, pipeline => {
      if (pipeline.id){
        var pipeline_name = pipeline.name.replace("/", "-");
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
              <Link to={`/pipelines/${pipeline_name}`}>
                Details
              </Link>
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-default btn-sm">
              <Link to={`/pipelines/${pipeline_name}/latestrun`}>
                Latest run
              </Link>
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-default btn-sm">
              <Link to={`/pipelines/${pipeline_name}/runs`}>
                All Runs
              </Link>
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-default btn-sm">
              <Link to={`/pipelines/${pipeline_name}/runview`}>
                Run View
              </Link>
            </button>
          </td>
        </tr>
    );
  }
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
