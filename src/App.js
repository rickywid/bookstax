import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    console.log('app');
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ user: nextProps.user });
  }

  render() {
    const { isAuth } = this.props;
    const { user } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            navigation
            {isAuth.authenticated ? ` ${user.name}` : 'Guest'}
          </nav>
          {Routes}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.getUser,
    isAuth: state.auth,
  };
}

export default connect(mapStateToProps, null)(App);

App.propTypes = {
  user: PropTypes.shape({}).isRequired,
  isAuth: PropTypes.shape({ authenticated: PropTypes.bool.isRequired }).isRequired,
};
