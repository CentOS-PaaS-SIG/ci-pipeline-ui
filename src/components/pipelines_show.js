import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipeline }  from '../actions';
import { Link } from 'react-router-dom';
var CONFIG = require("../constants/config")

class PipelinesShow extends Component {

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.fetchPipeline(id);
    this.intervalFun = setInterval(function(){
      this.props.fetchPipeline(id);
    }.bind(this), CONFIG.CACHE_TIMEOUT);
  }

  componentWillUnmount(){
    clearInterval(this.intervalFun);
  }

  render(){
    const { pipeline } = this.props;
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
      var url = `${CONFIG.JENKINS_BASE_URL}${ pipeline.latestRun.artifactsZipFile }`
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
