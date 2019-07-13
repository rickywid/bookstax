import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/simpleAction';

class Dashboard extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="dashboard">
        <p>Dashboard</p>
      </div>
    );
  }
}

export default connect(null, actions)(Dashboard);
