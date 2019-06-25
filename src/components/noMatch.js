import React from 'react';
// import styled from 'styled-components';

class NoMatch extends React.Component {
  componentDidMount() {
    console.log('no match mounted');
  }

  render() {
    return (
      <div className="no-match">
        <p>No Match</p>
      </div>
    );
  }
}

export default NoMatch;
