import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CurrentlyReading from './currently-reading';
import { Header2 } from '../../styled-components/header';

const Wrapper = styled.div`
  margin-bottom: 2rem;
`;
class BookshelfList extends Component {
  renderBooks(type) {
    const { bookshelf, markBookCompleted, isAuthorized } = this.props;

    if (type === 'current') {
      if (bookshelf[0].currently.length) {
        return bookshelf[0].currently.map((book, index) => <CurrentlyReading key={book.isbn} index={index} book={book} markBookCompleted={markBookCompleted} isAuthorized={isAuthorized} />);
      }
    }

    if (type === 'backlog') {
      if (bookshelf[0].backlog.length) {
        return bookshelf[0].backlog.map((book, index) => <CurrentlyReading key={book.isbn} index={index} book={book} markBookCompleted={markBookCompleted} isAuthorized={isAuthorized} />);
      }
    }

    if (type === 'complete') {
      if (bookshelf[0].completed.length) {
        return bookshelf[0].completed.map((book, index) => <CurrentlyReading key={book.isbn} index={index} book={book} markBookCompleted={markBookCompleted} isAuthorized={isAuthorized} />);
      }
    }

    return null;
  }

  render() {
    return (
      <div>
        <Header2>CURRENT</Header2>
        <Wrapper>
          {this.renderBooks('current')}
        </Wrapper>
        <Header2>BACKLOG</Header2>
        <Wrapper>
          {this.renderBooks('backlog')}
        </Wrapper>
        <Header2>COMPLETED</Header2>
        <Wrapper>
          {this.renderBooks('complete')}
        </Wrapper>
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
  markBookCompleted: PropTypes.func,
  isAuthorized: PropTypes.bool.isRequired,
};

BookshelfList.defaultProps = {
  markBookCompleted: null,
};
