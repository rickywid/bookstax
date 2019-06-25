import React from 'react';
// import styled from 'styled-components';

class SearchResults extends React.Component {
  componentDidMount() {
    console.log('search mounted');
  }

  render() {
    return (
      <div className="search-results">
        <p>Search results</p>
      </div>
    );
  }
}

export default SearchResults;
