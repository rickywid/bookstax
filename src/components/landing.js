import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../actions/simpleAction';

// import styled from 'styled-components';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };

    this.saveBook = this.saveBook.bind(this);
  }

  componentDidMount() {
    console.log('landing');
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

  handleSignIn = () => {
    window.open('http://localhost:3001/signin', '_self');
  }

  handleSearch() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=malcolm+gladwell?printType=books&maxResults=40').then(res => res.json()).then((json) => {
      this.setState({ results: [json] });
    });
  }

  render() {
    const { results } = this.state;
    return (
      <div className="landing">
        <button onClick={this.handleSignIn} type="button">Sign In With Google</button>
        <input type="text" placeholder="search title, author, isbn" />
        <button onClick={this.handleSearch.bind(this)} type="button">Search</button>
        {results.length > 0 ? results[0].items.map(book => (
          <div>
            <p>{book.volumeInfo.title}</p>
            <button type="button" onClick={() => this.saveBook(book.volumeInfo)}>save</button>
          </div>
        ))
          : ''
        }
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getUserProfile: () => dispatch(getUserProfile()),
});

// export default Landing;
export default connect(null, mapDispatchToProps)(Landing);
