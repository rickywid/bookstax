import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class BookProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [{ items: [] }],
      saveBookState: false,
    };
  }

  async componentDidMount() {
    const bookId = window.location.pathname.split('/')[2];

    if (localStorage.getItem('token')) {
      this.setState({ saveBookState: false });
    } else {
      this.setState({ saveBookState: true });
    }

    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookId}`).then(res => res.json()).then((json) => {
      this.setState({ results: [json] });
    });
  }


  saveBook = (book) => {
    const { bookId } = this.props.match.params.book_id; {/* eslint-disable-line */}
    const { loggedInUserListId, loggedInUserId } = this.props;

    const data = {
      id: loggedInUserListId,
      content: {
        bookId,
        title: book.title,
        author: book.authors[0],
        cover: book.imageLinks.smallThumbnail,
        description: book.description,
        avgRating: book.averageRating,
        pageCount: book.pageCount,
        isbn: book.industryIdentifiers[0].identifier,
        status: 'backlog',
      },
    };

    // save book to user's backlog
    fetch(`http://localhost:3000/user/addbook/${loggedInUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => console.log(res));
  }


  render() {
    const { results, saveBookState } = this.state;
    if (results[0].items.length === 0) return <div>loading</div>;
    const {
      authors, averageRating, categories, description, imageLinks, pageCount, title,
    } = results[0].items[0].volumeInfo;

    return (
      <div className="book-profile">
        <h3>{title}</h3>
        <img src={imageLinks.smallThumbnail} alt="cover" />
        {authors.map(author => <p key={author}>{author}</p>)}
        {categories !== undefined ? categories.map(category => <p key={category}>{category}</p>) : ''}
        <p>{description}</p>
        <p>
          Rating:
          {averageRating}
        </p>
        <p>
          page count:
          {pageCount}
        </p>
        <button type="button" onClick={() => this.saveBook(results[0].items[0].volumeInfo)} disabled={saveBookState}>save</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUserId: state.getUser.id,
    loggedInUserListId: state.getUser.list_id,
  };
}

export default connect(mapStateToProps, null)(BookProfile);

BookProfile.propTypes = {
  loggedInUserListId: PropTypes.number.isRequired,
  loggedInUserId: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      book_id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
