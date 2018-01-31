import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPipelines } from '../actions';

class PipelinesIndex extends Component {
  componentDidMount() {
  this.props.fetchPipelines();
  }
  renderPipelines(){
    return _.map(this.props.pipelines, pipeline => {
      return (
        <tr className="pipelineindex" key={`${pipeline.id}`}>
          <td>
              <Link to="">
                {pipeline.id}
              </Link>
          </td>
          <td>
              <Link to={`/pipelines/${pipeline.name}`}>
                {pipeline.name}
              </Link>
          </td>
          <td>
              <button type="button" className="btn btn-default">
                <Link to={`/pipelines/${pipeline.name}`}>
                  Details
                </Link>
              </button>
          </td>
          <td>
              <button type="button" className="btn btn-default">
                Latest run
              </button>
          </td>
        </tr>
    );
    });
  }
  render(){
    return (
      <tbody>
		    {this.renderPipelines()}
      </tbody>
    );
  }
}

//export default PipelineList;
function mapStateToProps(state){
  return {pipelines: state.pipelines};
}


export default connect(mapStateToProps, { fetchPipelines } )(PipelinesIndex);
