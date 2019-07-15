import React from 'react';
// import styled from 'styled-components';

class BookProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [{ items: [] }],
      saveBookState: false,
    };
  }

  componentDidMount() {
    const bookId = window.location.pathname.split('/')[2];

    if (localStorage.getItem('token')) {
      this.setState({ saveBookState: false });
    } else {
      this.setState({ saveBookState: true });
    }

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookId}`).then(res => res.json()).then((json) => {
      this.setState({ results: [json] });
    });
  }


  saveBook = (book) => {
    const data = {
      content: {
        title: book.title,
        author: book.authors[0],
        cover: book.imageLinks.smallThumbnail,
        isbn: book.industryIdentifiers[0].identifier,
        status: 'backlog',
      },
    };

    // save book to user's backlog
    fetch('http://localhost:3000/user/addbook/1', {
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
        {authors.map(author => <p>{author}</p>)}
        {categories.map(category => <p>{category}</p>)}
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

export default BookProfile;
