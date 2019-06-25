import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import App from './App';

// Pro Tip: You should write tests from a users point of view

// Avoid .simulate() https://github.com/airbnb/enzyme/issues/1606

// Jest Snapshots: Tests for any UI changes
// https://jestjs.io/docs/en/snapshot-testing

// Enzyme API
// https://airbnb.io/enzyme/

// Jest API
//

describe('Button exists', () => {
  it('check to see if button exists on page', () => {
    const wrapper = shallow(<App />);

    const link = wrapper.find('a').text();
    expect(link).toEqual('Learn React'); // PASS
  });
});
