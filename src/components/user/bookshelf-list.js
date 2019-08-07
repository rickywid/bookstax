import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CurrentlyReading from './currently-reading';

class BookshelfList extends Component {
  renderBooks(type) {
    const { bookshelf, markBookCompleted } = this.props;

    if (type === 'current') {
      if (bookshelf[0].currently.length) {
        return bookshelf[0].currently.map((book, index) => <CurrentlyReading key={book.isbn} index={index} book={book} markBookCompleted={markBookCompleted} />);
      }
    }

    if (type === 'backlog') {
      if (bookshelf[0].backlog.length) {
        return bookshelf[0].backlog.map((book, index) => <CurrentlyReading key={book.isbn} index={index} book={book} markBookCompleted={markBookCompleted} />);
      }
    }

    if (type === 'complete') {
      if (bookshelf[0].completed.length) {
        return bookshelf[0].completed.map((book, index) => <CurrentlyReading key={book.isbn} index={index} book={book} markBookCompleted={markBookCompleted} />);
      }
    }

    return null;
  }

  render() {
    return (
      <div>
        <h3>Currently</h3>
        <div className="wrap">
          {this.renderBooks('current')}
        </div>
        <h3>Backlog</h3>
        <div className="wrap">
          {this.renderBooks('backlog')}
        </div>
        <h3>Completed</h3>
        <div className="wrap">
          {this.renderBooks('complete')}
        </div>
      </div>
    );
  }
}

export default BookshelfList;

BookshelfList.propTypes = {
  bookshelf: PropTypes.arrayOf(PropTypes.shape({
    currently: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    backlog: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    completed: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  })).isRequired,
  markBookCompleted: PropTypes.func.isRequired,
};
