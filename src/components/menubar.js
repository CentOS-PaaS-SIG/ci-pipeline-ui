import React, { Component } from 'react';

class MenuBar extends Component {
  render(){
    return (
      <div className="menubar">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      </div>
    );
  }
}
export default MenuBar;
