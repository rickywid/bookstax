import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import * as actions from '../actions/simpleAction';

class Home extends React.Component {
  componentDidMount() {
    console.log('home');
    // const { getUserProfile, userAuth } = this.props;

    // user is authenticated, get user profile
    // getUserProfile();
    // userAuth();
  }

  render() {
    return (
      <div className="home">
        Home - Logged in
      </div>
    );
  }
}

export default connect(null, actions)(Home);

// Home.propTypes = {
//   getUserProfile: PropTypes.func.isRequired,
//   userAuth: PropTypes.func.isRequired,
// };
