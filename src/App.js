/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  render() {
    console.log(this.props.user);
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
Welcome
            {this.props.is_auth.authenticated ? this.props.user.name : 'Guest'}
          </nav>
          {Routes}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.auth);
  return {
    user: state.getUser,
    is_auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(App);

// export default App;
