import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RequireAuth = (ChildComponent) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const { auth, history } = this.props;
      if (!auth) {
        history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth.authenticated,
    };
  }

  ComposedComponent.propTypes = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    auth: PropTypes.bool.isRequired,
  };

  return connect(mapStateToProps)(ComposedComponent);
};

export default RequireAuth;
