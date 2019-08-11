import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BookItem from './book-item';
import { Header2 } from '../../styled-components/header';

const Container = styled.div`
  flex-basis: 70%;
  padding-right: 1rem;
`;
const Wrapper = styled.div`
  margin-bottom: 2rem;
  min-height: 260px;
`;

class BookshelfList extends Component {
  renderBooks(type) {
    const { bookshelf, markBookCompleted, isAuthorized } = this.props;

    if (type === 'current') {
      if (bookshelf[0].currently.length) {
        return bookshelf[0].currently.map((book, index) => <BookItem key={book.isbn} index={index} book={book} markBookCompleted={markBookCompleted} isAuthorized={isAuthorized} />);
      }
      return <p>You are not currently reading any books</p>;
    }

    if (type === 'backlog') {
      if (bookshelf[0].backlog.length) {
        return bookshelf[0].backlog.map((book, index) => <BookItem key={book.isbn} index={index} book={book} markBookCompleted={markBookCompleted} isAuthorized={isAuthorized} />);
      }
      return <p>You are no books in your backlog</p>;
    }

    if (type === 'complete') {
      if (bookshelf[0].completed.length) {
        return bookshelf[0].completed.map((book, index) => <BookItem key={book.isbn} index={index} book={book} markBookCompleted={markBookCompleted} isAuthorized={isAuthorized} />);
      }
      return <p>You have not completed any books yet</p>;
    }

    return null;
  }

  render() {
    return (
      <Container>
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
      </Container>
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
