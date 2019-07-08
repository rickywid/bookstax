import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import * as actions from './actions/simpleAction';

const Logo = styled.p`
  margin: 0;
`;

const NavBar = styled.nav`
  display: flex;
  padding: 0;
  justify-content: space-between;
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
`;

const NavItems = styled.li`
  display: inline-block;
  list-style: none;
  padding-right: 1rem;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };

    this.signout = this.signout.bind(this);
  }

  componentDidMount() {
    console.log('app');
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({ user: nextProps.user });
  }

  signout() {
    const { signOut } = this.props;
    console.log(signOut());
  }


  renderNavLinks() {
    const { isAuth } = this.props;
    const { user } = this.state;

    if (isAuth.authenticated) {
      return (
        <React.Fragment>
          <NavItems>{user.name}</NavItems>
          <NavItems onClick={this.signout}>Sign Out</NavItems>
        </React.Fragment>
      );
    }


    return (
      <React.Fragment>
        <navItems>Log In</navItems>
      </React.Fragment>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar>
            <Logo>Bookstax</Logo>
            <NavList>{this.renderNavLinks()}</NavList>
          </NavBar>
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

export default connect(mapStateToProps, actions)(App);

App.propTypes = {
  user: PropTypes.shape({}).isRequired,
  isAuth: PropTypes.shape({ authenticated: PropTypes.bool.isRequired }).isRequired,
  signOut: PropTypes.func.isRequired,
};
