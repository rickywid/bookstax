import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import * as actions from '../actions/simpleAction';

class Home extends React.Component {
  componentDidMount() {}

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
