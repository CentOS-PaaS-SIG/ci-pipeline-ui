import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PipelinesIndex from './pipelines_index';
class PipelineMain extends Component {
  render(){
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>weatherScore</th>
              <th>Details</th>
              <th>LatestRun</th>
              <th>AllRuns</th>
              <th>Run View</th>
            </tr>
          </thead>
          <PipelinesIndex>
          </PipelinesIndex>
        </table>
      </div>
    );
  }
}
export default PipelineMain;
