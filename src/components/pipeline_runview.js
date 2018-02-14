import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { fetchPipelineRunview }  from '../actions';
import ArtifactsModal from './artifacts_modal';

const JENKINS_URL = "https://jenkins-continuous-infra.apps.ci.centos.org";


class PipelineRunview extends Component {

  constructor () {
    super();
    this.state = {
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.fetchPipelineRunview(id);
  }

  renderRunNodes(nodes){
    return _.map(nodes, node  => {
      console.log(node);
      if (node.result && node.state){
        return(
          <div className="flex-item" key={node.id}>
            <div className="card">
              <h6><b>{node.displayName}</b></h6>
              <div className="cardcontainer">
                <span className="label label-default" >{node.result}</span>
                  <br></br>
                <span className="label label-default" >{node.state}</span>
              </div>
            </div>
          </div>
        )
      }
    });
  }

  renderRunview(){
    const { open } = this.state;
    return _.map(this.props.pipelines.pipelinerunview, (pipelinerunview, index) => {
      console.log(pipelinerunview);
      var artifactsURL = `${JENKINS_URL}/job/${pipelinerunview.pipeline}/${pipelinerunview.runid}/artifact/*zip*/archive.zip`
      console.log(artifactsURL);
      if (pipelinerunview.name){
          /*  convert the following modalbox into a component */
      return (
          <tr key={pipelinerunview.runid}>
            <td>
              <b>{pipelinerunview.runid}</b>
            </td>
            <td>
              <b> {pipelinerunview.name} </b>
              <br></br>
              <button className="btn btn-default btn-sm">
              <a href={`${artifactsURL}`}>
                 Artifacts Zip
              </a>
              </button>
              <ArtifactsModal>
              </ArtifactsModal>

            </td>
            <td>
              <div className="flex-container">
                {this.renderRunNodes(pipelinerunview.nodes)}
              </div>
            </td>
          </tr>
      )
    }
    })
  }
  render(){
    return(
      <div>
        <h3> Runview: </h3>
        <div className="table-responsive">
          <table className="table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Steps</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRunview()}
            </tbody>
          </table>
        </div>
    </div>
    );
  }
}

function mapStateToProps({ pipelines }, ownProps){
  return { pipelines };
}

export default connect(mapStateToProps, { fetchPipelineRunview })(PipelineRunview);
