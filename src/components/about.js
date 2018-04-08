import React, { Component } from 'react';
import Flipcard from './flipcard';

class About extends Component {
  render(){

    return(
      <div className="table-responsive">
        <table className="table-bordered table-hover">
          <colgroup>
          <col style={{width: '2%'}}></col>
          <col style={{width: '10%'}}></col>
          </colgroup>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Steps</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>hello</td>
            <td>hello</td>
            <td>
              <div className="flex-container">
                <Flipcard testvar="test_val">
                </Flipcard>
                <Flipcard testvar="test_val">
                </Flipcard>
                <Flipcard>
                </Flipcard>
                <Flipcard testvar="test_val">
                </Flipcard>
                <Flipcard testvar="test_val">
                </Flipcard>
                <Flipcard>
                </Flipcard>
                <br/>
                <Flipcard>
                </Flipcard>
                <Flipcard>
                </Flipcard>
                <Flipcard>
                </Flipcard>
                <Flipcard>
                </Flipcard>
                <Flipcard>
                </Flipcard>
                <Flipcard>
                </Flipcard>
              </div>
            </td>
          </tr>
        </tbody>
    </table>
  </div>
    );
  }
}

export default About;
