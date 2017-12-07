import React, { Component } from 'react';
import Header from '../containers/header';
import MenuBar from '../containers/menubar';
import Footer from '../containers/footer';
import BookList from '../containers/book_list';
import BookDetail from '../containers/book_detail';
export default class App extends Component {
  render() {
    return (

      <div className="fulldiv">
        <Header />
        <MenuBar />
        <BookList />
        <BookDetail />
        <Footer />
      </div>
    );
  }
}
