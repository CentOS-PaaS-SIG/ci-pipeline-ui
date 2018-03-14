import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { fetchPipelineRunArtifacts }  from '../actions';
var CONFIG = require("../constants/config");

class ArtifactsModal extends Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.JENKINS_URL= "https://jenkins-continuous-infra.apps.ci.centos.org"
  }

  componentWillMount() {
    this.props.fetchPipelineRunArtifacts(this.props.pipelinename, this.props.runid);
    this.intervalFun = setInterval(function() {
      this.props.fetchPipelineRunArtifacts(this.props.pipelinename, this.props.runid);
    }.bind(this), CONFIG.CACHE_TIMEOUT);
  }

  componentWillUnmount(){
    clearInterval(this.intervalFun);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  checkArtifactsExists(){
    var identifier = this.props.pipelinename+this.props.runid;
    //console.log("Inside check artifacts exists");
    //console.log(identifier);
    if ( identifier in this.props.pipelines.runartifacts){
      return true;
    }
    else{
      false
    }
  }

  renderArtifactFiles(artifactFiles){
    //console.log("Render artifact files called");
    return _.map(artifactFiles, artifact => {
      return(
      <div key={artifact.name} className="list-group">
      <li className="list-group-item active">  Name:   {artifact.name}</li>
      <li className="list-group-item">  Path: {artifact.path} </li>
      <li className="list-group-item">  Size: {artifact.size} </li>
      <li className="list-group-item">  URL: <a href={`${this.JENKINS_URL}${artifact.url}`} download> {artifact.url} </a> </li>
      </div>
    );
    });
  }

  render(){
    var runid = this.props.runid;
    var identifier = this.props.pipelinename+this.props.runid;
    if (!("runartifacts" in this.props.pipelines)){
      // instead of returning add loading gif
      return (
        <div>

          <button className="btn btn-default btn-sm" onClick={this.handleOpenModal}>Files</button>
          <ReactModal isOpen={this.state.showModal}
                      contentLabel="Minimal Modal Example"
                      ariaHideApp={false}>
                  <div className="jumbotron">    Artifacts files not found </div>
                      <button onClick={this.handleCloseModal} align="right">Close</button>
          </ReactModal>
        </div>
      );
    }
    if (("runartifacts" in this.props.pipelines) && this.checkArtifactsExists())
    {
      var artifactfiles = this.props.pipelines.runartifacts[identifier];
      return (
        <div>
          <button className="btn btn-default btn-sm" onClick={this.handleOpenModal}>Files</button>
          <ReactModal isOpen={this.state.showModal}
                      contentLabel="Minimal Modal Example"
                      ariaHideApp={false}>
          <div className="jumbotron"> <h2 style={{ display: 'inline' }}> Artifacts files </h2>
          <button className="btn btn-default btn-sm" onClick={this.handleCloseModal} >Close</button></div>
          {this.renderArtifactFiles(artifactfiles)}

          </ReactModal>
        </div>
      );
    }
    else if(!this.checkArtifactsExists()){
      return (
        <div>
          <button className="btn btn-default btn-sm" onClick={this.handleOpenModal}>Files</button>
          <ReactModal isOpen={this.state.showModal}
                      contentLabel="Minimal Modal Example"
                      ariaHideApp={false}>
                      Artifact files not found
          <button className="btn btn-default btn-sm" onClick={this.handleCloseModal} style={{alignSelf: 'flex-end'}}>Close Modal</button>
          </ReactModal>
        </div>
      );
    }
  }
}

function mapStateToProps({ pipelines }, ownProps){
  return { pipelines };
}

export default connect(mapStateToProps, { fetchPipelineRunArtifacts } )(ArtifactsModal);
