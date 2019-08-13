import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/simpleAction';

class Dashboard extends React.Component {
  componentDidMount() {
    const { state } = this.props.location; {/* eslint-disable-line */}
    // if Dashboard component is rendered from a redirect from user signup page, fetch user's data
    if (state) {
      const token = localStorage.getItem('token');
      if (token) {
        const { getLoggedInUserProfile } = this.props;
        getLoggedInUserProfile();
      }
    }
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
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
  getLoggedInUserProfile: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  location: {
    state: {},
  },
};
