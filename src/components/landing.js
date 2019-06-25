import React from 'react';
// import styled from 'styled-components';

class Landing extends React.Component {
  componentDidMount() {
    console.log('landing mounted');
  }

  render() {
    return (
      <div className="landing">
        <p>Landing page</p>
      </div>
    );
  }
}

export default Landing;
