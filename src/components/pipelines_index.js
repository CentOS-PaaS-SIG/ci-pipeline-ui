import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipelines } from '../actions';

class PipelinesIndex extends Component {
  componentDidMount() {
  this.props.fetchPipelines();
  }
  renderPipelines(){
	return _.map(this.props.pipelines, pipeline => {
		return (
			<li className="list-group-item" key={pipeline.id}>
				{pipeline.name}
			</li>
		);
	});
  }
  render(){
    console.log(this.props.pipelines);
    return (
	<div>
		<h3> Pipelines</h3>
		<ul className="list-group">
			{this.renderPipelines()}
		</ul> 
	</div>
    );
  }
}

//export default PipelineList;
function mapStateToProps(state){
  return {pipelines: state.pipelines};
}


export default connect(mapStateToProps, { fetchPipelines } )(PipelinesIndex);
