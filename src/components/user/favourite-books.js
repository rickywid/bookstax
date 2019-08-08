import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class FavouriteBooks extends Component {
  componentDidMount() {
    console.log('favourite books mounted');
  }

  render() {
    const { favourites } = this.props;
    return (
      <div>{favourites.map(book => <div key={book.bookId}><Link to={`/book/${book.bookId}`}><img src={book.cover} alt="" /></Link></div>)}</div>
    );
  }
}

export default FavouriteBooks;

FavouriteBooks.propTypes = {
  favourites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
