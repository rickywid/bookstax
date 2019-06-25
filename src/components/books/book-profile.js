import React from 'react';
// import styled from 'styled-components';

class BookProfile extends React.Component {
  componentDidMount() {
    console.log('mounted');
  }

  render() {
    return (
      <div className="book-profile">
        <p>Book Profile</p>
      </div>
    );
  }
}

export default BookProfile;
