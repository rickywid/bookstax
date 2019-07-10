import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
// import renderer from 'react-test-renderer';
import App from './App';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Pro Tip: You should write tests from a users point of view

// Avoid .simulate() https://github.com/airbnb/enzyme/issues/1606

// Jest Snapshots: Tests for any UI changes
// https://jestjs.io/docs/en/snapshot-testing

// Enzyme API
// https://airbnb.io/enzyme/

// Jest API
//

describe('Test', () => {
  it('A sample test', () => {
    const wrapper = mount(<Provider store={store}><App /></Provider>);

    const title = wrapper.find('p').text();
    expect(title).toEqual('BookStax'); // PASS
  });
});
