/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

import Landing from './landing';
import Home from './home';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  render() {
    return (
      <div className="main">
        {this.props.is_auth ? <Home /> : <Landing />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.getUser,
    is_auth: state.auth,
  };
}

// export default Landing;
export default connect(mapStateToProps, null)(Main);
