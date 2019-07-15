import React from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './App.css';
import SearchBooksModal from './components/searchBooksModal';
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
      results: [],
    };

    this.signout = this.signout.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const { getLoggedInUserProfile } = this.props;
      getLoggedInUserProfile();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  signout() {
    const { signOut } = this.props;
    signOut();
  }

  handleSearch() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=malcolm+gladwell?printType=books&maxResults=40').then(res => res.json()).then((json) => {
      this.setState({ results: [json] });
    });
  }

  renderNavLinks() {
    const { isAuth } = this.props;
    const { user } = this.state;

    if (isAuth.authenticated) {
      return (
        <React.Fragment>
          <NavItems>
            {/* eslint jsx-quotes: ["error", "prefer-single"] */}
            <Link to='/me'>
              {user.name}
              {' '}
              {user.id}
            </Link>
          </NavItems>
          <NavItems>
            {/* eslint jsx-quotes: ["error", "prefer-single"] */}
            <Link to='/me-list'>
Bookshelf
              {user.list_id}
            </Link>
          </NavItems>
          <NavItems onClick={this.signout}>Sign Out</NavItems>
        </React.Fragment>
      );
    }


    return (
      <React.Fragment>
        <NavItems>Log In</NavItems>
      </React.Fragment>
    );
  }

  render() {
    const { results } = this.state;
    return (
      <BrowserRouter>
        <div className='App'>
          <NavBar>
            <Logo>BookStax</Logo>
            <NavList>{this.renderNavLinks()}</NavList>
            <input type='text' placeholder='search title, author, isbn' />
            <button onClick={this.handleSearch.bind(this)} type='button'>Search</button>
          </NavBar>
          <SearchBooksModal results={results} />
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
  getLoggedInUserProfile: PropTypes.func.isRequired,
};
