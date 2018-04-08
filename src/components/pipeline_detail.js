import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { fetchPipelineDetail }  from '../actions';

var CONFIG = require("../constants/config")


class PipelineDetail extends Component {

  componentWillMount() {
    const id = this.props.match.params.id;
    console.log(id);
    this.props.fetchPipelineDetail(id);
    console.log(this.props.fetchPipelineDetail)
  }

  renderTime(duration){
      var date = new Date(duration);

      //console.log(duration);
      var str = '';
      let hrs = date.getUTCHours();
      let mins = date.getUTCMinutes()
      let secs = date.getUTCSeconds()
      let mills = date.getUTCMilliseconds()
      if (hrs > 0){
        str += hrs + "hr ";
      }
      if (mins > 0){
        str += mins + "m ";
      }
      if (secs > 0){
        str += secs + "s ";
      }
      else if (mills > 0){
        str += mills + "ms ";
      }
      return (
        <span>{str}</span>
      );
    }

  createMarkup(text){
      return { __html: text };
  }

  render(){
    console.log("inside pipeline detail render");
    console.log(this.props.pipelines.pipelinedetail);
    var pipelinedetail = this.props.pipelines.pipelinedetail;
    if (pipelinedetail){
      var url = `${CONFIG.JENKINS_BASE_URL}${ pipelinedetail.latestRun.artifactsZipFile }`;
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
                   <h4> {pipelinedetail.name} </h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4> Estimated Duration </ h4>
              </td>
              <td>
                <h4> { pipelinedetail.estimatedDurationInMillis } </h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4> WeatherScore: </ h4>
              </td>
              <td>
                <h4> { pipelinedetail.weatherScore } </h4>
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
                  <h4> {pipelinedetail.latestRun.commitId} </h4>
              </td>
            </tr>



                {pipelinedetail.latestRun.commitUrl ? (
                  <tr>
                  <td>
                    <h4> Commit URL </ h4>
                  </td>
                  <td>
                  <h4> {pipelinedetail.latestRun.commitUrl}</h4>
                  </td>
                  </tr>
                ) : (
                  <tr>
                  <td>
                  </td>
                  <td>
                  </td>
                  </tr>
                )}

            <tr>
              <td>
                <h4> Duration </ h4>
              </td>
              <td>
                {pipelinedetail.latestRun.durationInMillis ? (
                  <h4> {this.renderTime(pipelinedetail.latestRun.durationInMillis)}</h4>
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
                {pipelinedetail.latestRun.state ? (
                  <h4> {pipelinedetail.latestRun.state}</h4>
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
                {pipelinedetail.latestRun.result ? (
                  <h4> {pipelinedetail.latestRun.result}</h4>
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
                {pipelinedetail.latestRun.runSummary ? (
                  <h4> {pipelinedetail.latestRun.runSummary}</h4>
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
                {pipelinedetail.latestRun.description ? (
                  <h4> <div dangerouslySetInnerHTML={this.createMarkup(pipelinedetail.latestRun.description)}/></h4>
                ) : (
                  <h4> undefined </h4>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      );
    }
    else{
      return(
        <div>
          Loading ...
          <img src="/static/loading.gif" alt="Smiley face" height="42" width="42">
          </img>
        </div>
      );
    }
  }
}

//export default PipelineDetail;
function mapStateToProps({ pipelines }, ownProps){
  //console.log("inside pipeline detail");
  //console.log(pipelines);
  return { pipelines };
}

export default connect(mapStateToProps, { fetchPipelineDetail })(PipelineDetail);
