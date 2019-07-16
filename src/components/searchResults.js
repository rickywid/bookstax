import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchResults extends React.Component {
  componentDidMount() {
    console.log('search results mounted');
  }

  render() {
    const { searchResults } = this.props;
    return (
      <div>

        {searchResults[0].length > 0 ? searchResults[0].map(book => (
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

function mapStateToProps(state) {
  return { searchResults: state.searchResults };
}

export default connect(mapStateToProps, null)(SearchResults);


SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf.isRequired,
};
