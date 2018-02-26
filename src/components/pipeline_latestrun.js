import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPipelineLatestrun } from '../actions';
var CONFIG = require("../constants/config")

class PipelineLatestrun extends Component {

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.fetchPipelineLatestrun(id);
    this.intervalFun = setInterval(function(){
      this.props.fetchPipelineLatestrun(id);
    }.bind(this), CONFIG.CACHE_TIMEOUT);
  }

  componentWillUnmount(){
    clearInterval(this.intervalFun);
  }

  renderLatestRun(){
    return _.map(this.props.pipelines.pipelinelatestrun, plr => {
      return (
        <div key={plr.id}>
          <h5> id: {plr.id}</h5>
          <h5> Name: {plr.id}</h5>
          <h5> Result: {plr.result}</h5>
        </div>
      );
    })
  }
  render(){
    if(Object.keys(this.props.pipelines).length ==0){
      return(
        <div>
          <h3> Loading ... </h3>
          <img src="/static/loading.gif" alt="Smiley face" height="42" width="42">
          </img>
        </div>
      );
    }
    else{
      return(
        <div>
          {this.renderLatestRun()}
        </div>
      );
  }
  }
}

function mapStateToProps(state){
  return {pipelines: state.pipelines};
}

export default connect(mapStateToProps, { fetchPipelineLatestrun } )(PipelineLatestrun);
