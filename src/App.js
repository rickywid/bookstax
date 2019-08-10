import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import Routes from './routes';
import * as actions from './actions/simpleAction';
import Logo from './assets/images/logo.png';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  margin-bottom: 3rem;
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  display: inline-block;
`;

const NavRightSide = styled.div`
  display: flex;
`;

const NavItems = styled.li`
  display: inline-block;
  list-style: none;
  padding-right: 1rem;
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`;

const { Search } = Input;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
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

  onFormSubmit(e = {}, values = {}) {
    let query = values;
    if (e) {
      query = e.target.value;
    }

    const { searchResults, history } = this.props;
    searchResults(query, history);
  }

  signout() {
    const { signOut } = this.props;
    signOut();
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
        <NavItems>About</NavItems>
        <NavItems>About</NavItems>
        <NavItems>About</NavItems>
        <NavItems>Reading Test</NavItems>
        <NavItems><Button>Sign In</Button></NavItems>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className='App'>
        <NavBar>
          <Link to='/'><img style={{ width: '65%' }} src={Logo} alt='logo' /></Link>
          <Search
            placeholder='search book...'
            onSearch={values => this.onFormSubmit(null, values)}
            onPressEnter={e => this.onFormSubmit(e)}
            style={{ width: 300 }}
            allowClear
          />
          <NavRightSide>
            <NavList>{this.renderNavLinks()}</NavList>
          </NavRightSide>
        </NavBar>
        <Container>
          {Routes}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.getUser,
    isAuth: state.auth,
  };
}

App.propTypes = {
  user: PropTypes.shape({}).isRequired,
  isAuth: PropTypes.shape({ authenticated: PropTypes.bool.isRequired }).isRequired,
  signOut: PropTypes.func.isRequired,
  getLoggedInUserProfile: PropTypes.func.isRequired,
  searchResults: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, actions)(withRouter(App));
