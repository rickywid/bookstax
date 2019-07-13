import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Home from './home';
import Landing from './landing';
// import * as actions from '../actions/simpleAction';

class Main extends React.Component {
  componentDidMount() {}

  render() {
    const { isAuth } = this.props;
    return (
      <div className="home">
        {isAuth.authenticated ? <Home /> : <Landing />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth,
  };
}

export default connect(mapStateToProps, null)(Main);

Main.propTypes = {
  isAuth: PropTypes.shape({ authenticated: PropTypes.bool.isRequired }).isRequired,
};
