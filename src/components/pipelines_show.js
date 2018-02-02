import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipeline }  from '../actions';

class PipelinesShow extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPipeline(id);
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
      return (
        <div>
          <h4> Name of pipeline:  { pipeline.displayName } </ h4>
          <h4> State: { pipeline.organization } </ h4>
        </div>
      )
    }
  }
}

function mapStateToProps({ pipelines }, ownProps){
  return { pipeline: pipelines[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPipeline })(PipelinesShow);
