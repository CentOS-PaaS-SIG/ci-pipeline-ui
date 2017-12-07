import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
  renderList(){
    return this.props.books.map((book) => {
      return(
        <li
          key={book.title}
          onClick={() => this.props.selectBook(book)}
          className="list-group-item">
          {book.title}
        </li>
      );
    });
  }

  render(){
    return(
      <ul className="list-group col-sm-2">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state){
  // whatever is returned from here will show up as props
  return {
    books: state.books
  }
}
// anything returns from this function endup as props on BookList container
function mapDispatchToProps(dispatch){
  // whenever select book is called result should be called to all
  // reducers
  return bindActionCreators({ selectBook: selectBook}, dispatch)
}

// Promote component to container and
// make dispatch method make it available as a props
export default connect(mapStateToProps, mapDispatchToProps)(BookList)
