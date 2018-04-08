import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipelineViewByName } from '../actions';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';


class PipelineViewcon extends Component {
  componentWillMount() {
    this.props.fetchPipelineViewByName(this.props.viewname);
  }

  renderRows(){
    return _.map(this.props.pipelines.pipelineview.jobDetails, function(job, index) {
      var pvjob = `pvjob-${index}`;
      console.log(job);
      return(
        <tr key={pvjob}>
        <td>{index}</td>
        <td>
          {
          job.latestRun && job.latestRun.result == 'SUCCESS' && job.latestRun.state == 'FINISHED' &&
          <img src="/static/green.png" alt="Smiley face" height="32" width="32">
          </img>
          }
          {
          job.latestRun && job.latestRun.result == 'FAILURE' && job.latestRun.state == 'FINISHED' &&
          <img src="/static/red.png" alt="Smiley face" height="32" width="32">
          </img>
          }
          {
          job.latestRun == null &&
          <img src="/static/disabled.png" alt="Smiley face" height="32" width="32">
          </img>
          }
          {
          job.latestRun && job.latestRun.state == 'UNKNOWN' && job.latestRun.state == "QUEUED" &&
          <img src="/static/blue_anime.gif" alt="Smiley face" height="32" width="32">
          </img>
          }
        </td>
        <td>
          {
          job.weatherScore < 20 &&
          <img src="/static/health-00to19.png" alt="Smiley face" height="32" width="32">
          </img>
          }
          {
          job.weatherScore >= 20 && job.weatherScore < 40 &&
          <img src="/static/health-20to39.png" alt="Smiley face" height="32" width="32">
          </img>
          }
          {
          job.weatherScore >= 40 && job.weatherScore < 60 &&
          <img src="/static/health-40to59.png" alt="Smiley face" height="32" width="32">
          </img>
          }
          {
          job.weatherScore >= 60 && job.weatherScore < 79 &&
          <img src="/static/health-60to79.png" alt="Smiley face" height="32" width="32">
          </img>
          }
          {
          job.weatherScore >= 80 &&
          <img src="/static/health-80plus.png" alt="Smiley face" height="32" width="32">
          </img>
          }
        </td>
        <td>{job.name}</td>
        <td><a href={job.url}> Open Jenkins </a></td>
        <td>
          <button type="button" className="btn btn-default btn-sm">
            <Link to={`/pipeline/${job.name}/details`}>
              Details
            </Link>
          </button>
        </td>
        <td>
          <button type="button" className="btn btn-default btn-sm">
            <Link to={`/pipelines/${job.name}/runs`}>
              All Runs
            </Link>
          </button>
        </td>
        <td>
          <button type="button" className="btn btn-default btn-sm">
            <Link to={`/pipelines/${job.name}/jenkinsview`}>
              Jenkins View
            </Link>
          </button>
        </td>
        </tr>
      );
    });
  }

  render(){
    if(this.props.viewname && this.props.pipelines.pipelineview){
      return(
        <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>status </th>
              <th>Weather </th>
              <th>Name</th>
              <th>Jenkins URL</th>
              <th>Details</th>
              <th>All Runs</th>
              <th>Jenkins View</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
      );
    }
    else{
      return(
        <div> Loading ...</div>
      );
    }
  }
}

function mapStateToProps(state){
  return {pipelines: state.pipelines};
}

//export default PipelineViewContent;

export default connect(mapStateToProps, { fetchPipelineViewByName } )(PipelineViewcon);
