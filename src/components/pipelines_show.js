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

  createMarkup(text){
    return { __html: text };
  }

  renderLatestRun(pipelinelatestrun){
    console.log(pipelinelatestrun);
    var url = `${CONFIG.JENKINS_BASE_URL}${ pipelinelatestrun.artifactsZipFile }`

    return(
      <div>
      <table className="table table-hover table-bordered">
        <thead className="thead-light">

        </thead>
        <tbody>

        </tbody>
    </table>
  </div>
    );
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
      console.log(pipeline);
      return (
        <div>
        <table className="table table-hover table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col" colSpan="2"><div className="jumbotron"><h2>Pipeline Details </h2></div></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4> Name of pipeline: </ h4>
              </td>
              <td>
               <h4> { pipeline.displayName } </ h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4> Organization: </ h4>
              </td>
              <td>
               <h4> { pipeline.organization } </ h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4> Estimated Duration </ h4>
              </td>
              <td>
               <h4> { pipeline.estimatedDurationInMillis} </ h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4> WeatherScore: </ h4>
              </td>
              <td>
               <h4> { pipeline.weatherScore } </ h4>
              </td>
            </tr>
            <tr>
              <th scope="col" colSpan="2"><h4>Pipeline LatestRun </h4></th>
            </tr>
            <tr>
              <td>
                <h4> Latest run Artifacts: </ h4>
              </td>
              <td>
                <h4> <a href={ url }> Download </a> </ h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4> Commit id </ h4>
              </td>
              <td>
                {pipeline.latestRun.commitId ? (
                  <h4> {pipeline.latestRun.commitId} </h4>
                ) : (
                  <h4> undefined </h4>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <h4> Commit URL </ h4>
              </td>
              <td>
                {pipeline.latestRun.commitUrl ? (
                  <h4> {pipeline.latestRun.commitUrl}</h4>
                ) : (
                  <h4> undefined </h4>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <h4> Duration </ h4>
              </td>
              <td>
                {pipeline.latestRun.durationInMillis ? (
                  <h4> {pipeline.latestRun.durationInMillis}</h4>
                ) : (
                  <h4> undefined </h4>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <h4> State </ h4>
              </td>
              <td>
                {pipeline.latestRun.state ? (
                  <h4> {pipeline.latestRun.state}</h4>
                ) : (
                  <h4> undefined </h4>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <h4> Result </ h4>
              </td>
              <td>
                {pipeline.latestRun.result ? (
                  <h4> {pipeline.latestRun.result}</h4>
                ) : (
                  <h4> undefined </h4>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <h4> RunSummary </ h4>
              </td>
              <td>
                {pipeline.latestRun.runSummary ? (
                  <h4> {pipeline.latestRun.runSummary}</h4>
                ) : (
                  <h4> undefined </h4>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <h4> Description </ h4>
              </td>
              <td>
                {pipeline.latestRun.description ? (
                  <h4> <div dangerouslySetInnerHTML={this.createMarkup(pipeline.latestRun.description)}/></h4>
                ) : (
                  <h4> undefined </h4>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      )
    }
  }
}

function mapStateToProps({ pipelines }, ownProps){
  return { pipeline: pipelines[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPipeline })(PipelinesShow);
