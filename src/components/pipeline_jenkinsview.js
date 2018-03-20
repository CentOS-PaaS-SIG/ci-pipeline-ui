import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { fetchPipelineJenkinsview }  from '../actions';

var CONFIG = require("../constants/config")


class PipelineJenkinsview extends Component {
  componentWillMount() {
    const id = this.props.match.params.id;
    //console.log(id);
    this.props.fetchPipelineJenkinsview(id);
  }

  renderLabel(labelState) {
    if (labelState == "SUCCESS") {
      return (
        <span className="label label-info">Success</span>
      );
    }
    else if (labelState == "FAILURE") {
      return (
        <span className="label label-danger">Failure</span>
      );
    }
    else if (labelState == "FAILED") {
      return (
        <span className="label label-danger">Failed</span>
      );
    }
    else if (labelState == "FINISHED") {
      return (
        <span className="label label-default">Finished</span>
      );
    }
    return (
      <span className="label label-default" >{labelState}</span>
    );
  }

  renderSteps(stages){
    //console.log("stages reached");
    //console.log(stages);
    return _.map(stages, stage  => {
      console.log(stage);
        return(
          <td key={stage.id}>
          <div className="">
          <div className="" key={stage.id}>
            <div className="jcard">
              <div className="jcardcontainer">
                {this.renderLabel(stage.status)}
              </div>
            </div>
          </div>
          </div>
        </td>
        );
      });
  }

  renderRows(){
    return _.map(this.props.pipelines.pipelinejenkinsview, node  => {
      //console.log(node);
        return(
          <tr key={node.id}>
          <td>{node.id}</td>
          <td className="wordwrap">{node.name}</td>
          {this.renderSteps(node.stages)}
          </tr>
        );
      });
  }

  getMaxRows(workflows){
    console.log("inside the workflows");
    console.log(workflows);
    var maxrows = 0;
    var rowHeaders = [];
    for (var ri in workflows){
      var r = workflows[ri];
      if (r["stages"].length > maxrows){
        maxrows = r["stages"].length;
        rowHeaders = r["stages"];
      }
    }
    //console.log("rowHeaders are :: ");
    //console.log(rowHeaders);

    return rowHeaders;
  }
  renderHeaders(rowHeaders){
    console.log("inside row headers");
    console.log(rowHeaders);
    var headers = _.map(rowHeaders, rh => {
      console.log(rh);
      return (
        <th key={rh.id}> {rh.name} </th>
      );
    });
    console.log(headers);
    return headers;
  }

  renderColGroups(rowHeaders){
    let headerLength = rowHeaders.length;
    let percentage = 83/headerLength;
    var colgroups = _.map(rowHeaders, rh => {
      return (
        <col style={{width: percentage}}></col>
      );
    });
    return colgroups;
  }

  render(){
    console.log(this.props.pipelines.pipelinejenkinsview);
    if(this.props.pipelines.pipelinejenkinsview){
      console.log("inside render jenkinsview");
      var workflows = this.props.pipelines.pipelinejenkinsview;
      console.log(workflows);
      var rowHeaders = this.getMaxRows(workflows);
      return (
          <div className="table-responsive">
            <table className="table-bordered table-hover">
              <colgroup>
              <col style={{width: '2%'}}></col>
              <col style={{width: '15%'}}></col>
              {this.renderColGroups(rowHeaders)}
              </colgroup>
              <thead>
                <tr>
                  <th> # </th>
                  <th> Name </th>
                  {this.renderHeaders(rowHeaders)}
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
    return (
      <div>
        Loading ...
        <img src="/static/loading.gif" alt="Smiley face" height="42" width="42">
        </img>
      </div>
    );
  }
  }
}

function mapStateToProps({ pipelines }, ownProps){
  return { pipelines };
}

export default connect(mapStateToProps, { fetchPipelineJenkinsview })(PipelineJenkinsview);
