import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPipelineRunview }  from '../actions';


class PipelineRunview extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPipelineRunview(id);
  }
  renderRunview(){
    return (
      <tbody>
        <tr>
          <td>
            <div className="fleft">
              <div className="card">
                <div className="cardcontainer">
                  <h4><b>Step1</b></h4>
                  <button className="btn"> clickme </button>
                </div>
              </div>
            <div className="card ">
              <div className="cardcontainer">
                <h4><b>Step2  : hello there ......</b></h4>
                <button className="btn"> clickme </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="fleft">
              <div className="card">
                <div className="cardcontainer">
                  <h4><b>Step1</b></h4>
                  <button className="btn"> clickme </button>
                </div>
              </div>
            <div className="card ">
              <div className="cardcontainer">
                <h4><b>Step2  : hello there ......</b></h4>
                <button className="btn"> clickme </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }
  render(){
    console.log("Inside the component runview");
    console.log(this.props);
    return(
      <table>
      {this.renderRunview()}
    </table>

    );
  }

}

//export default PipelineRunview;

/*
class PipelineRuns extends Component {

  renderPipelineRuns(){
    return _.map(this.props.pipelines.pipelineruns, pipelinerun => {
      return (
        <tr key={pipelinerun.id}>
          <td>
            {pipelinerun.id}
          </td>
          <td>
            {pipelinerun.name}
          </td>
          <td>
            {pipelinerun.result}
          </td>
          <td>
            <button className="btn btn-default btn-sm">
              Artifacts
            </button>
            <button className="btn btn-default btn-sm">
              Nodes
            </button>
          </td>
        </tr>
      )
    })
  }
  render(){
    const { pipelines } = this.props;
    console.log(pipelines);
    if (Object.keys(pipelines).length == 0){
      return (
        <div>
          <h3> Loading ... </h3>
          <img src="/static/loading.gif" alt="Smiley face" height="42" width="42">
          </img>
        </div>
      )
    }
    else{
      return (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
            {this.renderPipelineRuns()}
          </tbody>
          </table>
        </div>
      );
    }
  }
}

*/
function mapStateToProps({ pipelines }, ownProps){
  return { pipelines };
}

export default connect(mapStateToProps, { fetchPipelineRunview })(PipelineRunview);
