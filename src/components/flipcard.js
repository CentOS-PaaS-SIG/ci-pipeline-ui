import React, { Component } from 'react';

class Flipcard extends Component {
  render(){
    console.log(this.props);
    if (this.props.testvar){
      return(
        <div className="flex-item">
          <div className="card">
            <h6><b>testnode</b></h6>
            <div className="cardcontainer greencolordiv">
              <div className="wordwrap">
                testresult
                <br></br>
                testresult
              </div>
              <div className="wordwrap">
                testresult back
                <br></br>
                testresult back
              </div>
            </div>
          </div>
      </div>
      );
    }
    else{
      return(
        <div className="flex-item">
          <div className="card">
            <h6><b>testnode</b></h6>
            <div className="cardcontainer redcolordiv">
              <div className="wordwrap">
                testresult
                <br></br>
                testresult
              </div>
              <div className="wordwrap">
                testresult back
                <br></br>
                testresult back
              </div>

            </div>

          </div>
      </div>
      );
    }

  }
}

export default Flipcard;
