import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipelineViewByName } from '../actions';
import { Table } from 'reactstrap';
import WeatherIcon from './weather_icon';

class PipelineViewcon extends Component {
  componentWillMount() {
    this.props.fetchPipelineViewByName(this.props.viewname);
  }

  renderRows(){
    return _.map(this.props.pipelines.pipelineview.jobs, function(job, index) {
      var pvjob = `pvjob-${index}`;
      console.log(job);
      return(
        <tr key={pvjob}>
        <td>{index}</td>
        <td>

          {
          job.color == 'blue' &&
          <img src="/static/green.png" alt="Smiley face" height="32" width="32">
          </img>
          }
          {
          job.color == 'red' &&
          <img src="/static/red.png" alt="Smiley face" height="32" width="32">
          </img>
          }
          {
          (job.color == 'disabled' || job.color == 'notbuilt' || job.color == 'aborted') &&
          <img src="/static/disabled.png" alt="Smiley face" height="32" width="32">
          </img>
          }
          {
          job.color == 'blue_anime' &&
          <img src="/static/blue_anime.gif" alt="Smiley face" height="32" width="32">
          </img>
          }
        </td>
        <td> <WeatherIcon /> </td>
        <td>{job.name}</td>
        <td><a href={job.url}> Open Jenkins </a></td>
        </tr>
      );
    });
  }

  render(){
    //console.log("inside render of pipelineview content");
    //console.log(this.props);
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
