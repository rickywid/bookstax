import React from 'react';
// import styled from 'styled-components';

class Dashboard extends React.Component {
  componentDidMount() {
    console.log('dashboard mounted');
  }

  render() {
    return (
      <div className="dashboard">
        <p>Dashboard</p>
      </div>
    );
  }
}

export default Dashboard;
