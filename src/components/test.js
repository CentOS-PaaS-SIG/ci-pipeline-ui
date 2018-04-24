import React, { Component } from 'react';

class Test extends Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  componentWillMount(){
    console.log("Test component mounted !!");
  }
  handleClick = () => {
    console.log('this is:', this);
  }

  testClick(){
    console.log("clicked");
  }

  render() {
    return (
      <button onClick={this.testClick}>
        Click me
      </button>
    );
  }
}

export default Test;
