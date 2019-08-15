import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  clear: both;
`;
const Wrapper = styled.div`
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;
class FavouriteBooks extends Component {
  componentDidMount() {
    console.log('favourite books mounted');
  }

  render() {
    const { favourites } = this.props;
    return (
      <Container className="animate fadeIn">
        {favourites.map(book => <Wrapper key={book.bookId}><Link to={`/book/${book.bookId}`}><img src={book.cover} alt="" /></Link></Wrapper>)}
      </Container>
    );
  }
}

export default FavouriteBooks;

FavouriteBooks.propTypes = {
  favourites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
