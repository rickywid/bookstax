/* eslint-disable */

import React, { Component } from 'react';

const IsLoading = propName => (ChildComponent) => {
  class ComposedComponent extends Component {
    render() {
      return this.props[propName] ? <ChildComponent {...this.props} /> : <div>loading</div>;
    }
  }

  return ComposedComponent;
};

export default IsLoading;
