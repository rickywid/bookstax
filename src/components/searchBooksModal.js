import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchBooksModal extends React.Component {
  componentDidMount() {
    console.log('search modal');
  }

  render() {
    const { results } = this.props;
    return (
      <div>
        {results.length > 0 ? results[0].items.map(book => (
          <div>
            <Link to={{ pathname: `/book/${book.id}`, query: book.volumeInfo }}>
              <p>{book.volumeInfo.title}</p>
              {book.volumeInfo.imageLinks.smallThumbnail ? <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="book cover" /> : ''}
            </Link>
          </div>
        ))
          : ''
        }
      </div>
    );
  }
}

export default SearchBooksModal;


SearchBooksModal.propTypes = {
  results: PropTypes.shape({ length: PropTypes.number.isRequired }).isRequired,
};
