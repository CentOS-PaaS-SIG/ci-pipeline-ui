import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PipelinesIndex from './pipelines_index';
import { Table } from 'reactstrap';
class PipelineMain extends Component {
  render(){
    return (
        <Table hover>
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
        </Table>
    );
  }
}
export default PipelineMain;
