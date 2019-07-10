import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/simpleAction';

class Dashboard extends React.Component {
  componentDidMount() {
    const { getLoggedInUserProfile } = this.props;
    getLoggedInUserProfile();
  }

  render() {
    return (
      <div className="dashboard">
        <p>Dashboard</p>
      </div>
    );
  }
}

export default connect(null, actions)(Dashboard);

Dashboard.propTypes = {
  getLoggedInUserProfile: PropTypes.func.isRequired,
};
