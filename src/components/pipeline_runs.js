import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipelineRuns }  from '../actions';
var CONFIG = require("../constants/config")

class PipelineRuns extends Component {

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.fetchPipelineRuns(id);
    this.intervalFun = setInterval(function(){
      this.props.fetchPipelineRuns(id);
    }.bind(this), CONFIG.CACHE_TIMEOUT);
  }

  componentWillUnmount(){
    clearInterval(this.intervalFun);
  }

  renderPipelineRuns(){
    return _.map(this.props.pipelines.pipelineruns, pipelinerun => {
      return (
        <tr key={pipelinerun.id}>
          <td>
            {pipelinerun.id ? (
              <h6> {pipelinerun.id} </h6>
            ) : (
              <h6> undefined </h6>
            )}
          </td>
          <td>
            {pipelinerun.name ? (
              <h6> {pipelinerun.name} </h6>
            ) : (
              <h6> undefined </h6>
            )}
          </td>
          <td>
            {pipelinerun.result}
          </td>
          <td>
            <button className="btn btn-default btn-sm">
              Artifacts
            </button>
            <button className="btn btn-default btn-sm">
              Nodes
            </button>
          </td>
        </tr>
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
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
            {this.renderPipelineRuns()}
          </tbody>
          </table>
      );
    }
  }
}

function mapStateToProps({ pipelines }, ownProps){
  return { pipelines };
}

export default connect(mapStateToProps, { fetchPipelineRuns })(PipelineRuns);
