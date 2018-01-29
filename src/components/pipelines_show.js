import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipeline }  from '../actions';


class PipelinesShow extends Component {
  componentDidMount() {
    //console.log(this.props.match.params.id);
    const id = this.props.match.params.id;
    //console.log(id);
    this.props.fetchPipeline(id);
  }
  render(){
    console.log("inside render")
    console.log(this.props);
    const { pipeline } = this.props;
    if (!pipeline){
      return (
        <div>
          Posts Show!
        </div>
      )
    }
    else{
      // console.log(pipeline);
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
  //console.log(ownProps);
  //console.log("data inside pipelines")
  //console.log(pipelines);
  return { pipeline: pipelines[ownProps.match.params.id] };

}

export default connect(mapStateToProps, { fetchPipeline })(PipelinesShow);
