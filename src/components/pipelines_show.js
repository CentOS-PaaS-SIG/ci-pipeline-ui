import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipeline }  from '../actions';
import { Link } from 'react-router-dom';

class PipelinesShow extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPipeline(id);
  }
  render(){
    const { pipeline } = this.props;
    var jenkins_url = "https://jenkins-continuous-infra.apps.ci.centos.org";
    if (!pipeline){
      return (
        <div>
          Loading ...
          <img src="/static/loading.gif" alt="Smiley face" height="42" width="42">
          </img>
        </div>
      )
    }
    else{
      console.log(pipeline);
      var url = `${jenkins_url}${ pipeline.latestRun.artifactsZipFile }`
      return (
        <div>
          <h4> Name of pipeline:  { pipeline.displayName } </ h4>
          <h4> WeatherScore: { pipeline.weatherScore } </ h4>
          <h4> Latest run Artifacts : <a href={ url }> Download </a></h4>
        </div>
      )
    }
  }
}

function mapStateToProps({ pipelines }, ownProps){
  return { pipeline: pipelines[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPipeline })(PipelinesShow);
