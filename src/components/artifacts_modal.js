import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { fetchPipelineRunArtifacts }  from '../actions';


class ArtifactsModal extends Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    //console.log("Inside artifacts modal component will mount");
    this.props.fetchPipelineRunArtifacts(this.props.pipelinename, this.props.runid);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  checkArtifactsExists(){

    var identifier = this.props.pipelinename+this.props.runid;
    console.log("Inside check artifacts exists");
    console.log(identifier);
    if ( identifier in this.props.pipelines.runartifacts){
      return true;
    }
    else{
      false
    }
  }

  render(){
    console.log("Inside the render method of artifacts modal");
    console.log(this.props);
    var runid = this.props.runid;
    if (!("runartifacts" in this.props.pipelines)){
      // instead of returning add loading gif
      return (
        <div>
          <button className="btn btn-default btn-sm" onClick={this.handleOpenModal}>Files</button>
          <ReactModal isOpen={this.state.showModal}
                      contentLabel="Minimal Modal Example"
                      ariaHideApp={false}>
                      Sorry Artifacts files not found
          <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>
        </div>
      );
    }
    if (("runartifacts" in this.props.pipelines) && this.checkArtifactsExists() )
    {
      return (
        <div>
          <button className="btn btn-default btn-sm" onClick={this.handleOpenModal}>Files</button>
          <ReactModal isOpen={this.state.showModal}
                      contentLabel="Minimal Modal Example"
                      ariaHideApp={false}>
                      Hello am inside react model and artifacts files found
                      <br/>
                      hahaha
          <button onClick={this.handleCloseModal}>Close Modal</button>
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
          <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>
        </div>
      );
    }
  }
}

function mapStateToProps({ pipelines }, ownProps){
  //console.log("inside artifacts modal map state to props")
  //console.log("inside map state to props");
  //console.log(pipelines);
  return { pipelines };
}

export default connect(mapStateToProps, { fetchPipelineRunArtifacts } )(ArtifactsModal);