import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/simpleAction';

class Redirect extends Component {
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    localStorage.setItem('token', token);
    const { googleSignIn, history } = this.props;
    googleSignIn(history);
  }

  render() {
    return (
      <div>
        Redirecting...
      </div>
    );
  }
}

Redirect.propTypes = {
  googleSignIn: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(null, actions)(Redirect);
