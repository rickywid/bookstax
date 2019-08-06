/* eslint-disable */

import React, { Component } from 'react';

const IsLoading = propName => (ChildComponent) => {
  class ComposedComponent extends Component {
    isEmpty(prop) {
      // check if object or array is empty
      return (
        prop === null ||
        prop === undefined ||
        Object.keys(prop).length === 0 && prop.constructor === Object ? false : true
      )
    }

    render() {
      return this.isEmpty(this.props[propName]) ? <ChildComponent {...this.props} /> : <div>loading</div>;
    }
  }

  return ComposedComponent;
};

export default IsLoading;
