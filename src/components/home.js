/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/simpleAction';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // user is authenticated, get user profile
    this.props.getUserProfile();
    this.props.userAuth();
  }

  render() {
    return (
      <div className="home">
        Logged in
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   console.log(state);
// }

// export default Landing;
export default connect(null, actions)(Home);
