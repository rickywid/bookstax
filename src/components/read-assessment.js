import React from 'react';
// import styled from 'styled-components';

class ReadAssessment extends React.Component {
  componentDidMount() {
    console.log('read assessment mounted');
  }

  render() {
    return (
      <div className="read-assessment">
        <p>Read Assessment</p>
      </div>
    );
  }
}

export default ReadAssessment;
