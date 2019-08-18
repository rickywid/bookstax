import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import Routes from './routes';
import * as actions from './actions/simpleAction';
import Logo from './assets/images/logo.png';
import { ReactComponent as Avatar } from './assets/icons/avatar.svg';

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
  display: flex;
`;

const NavRightSide = styled.div`
  display: flex;
`;

const NavItems = styled.li`
  display: inline-block;
  list-style: none;
  padding-right: 1rem;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding-bottom: 5rem;
`;

const AvatarStyle = styled(Avatar)`
  width: 30px;
  margin-right: 1rem;
  float: left;
`;

const AvatarWrapper = styled.div`
  height: 30px !important;
  width: 30px !important;
  border-radius: 50%;
  overflow: hidden;
  background-image: ${props => (props.img ? `url(${props.img})` : '')};
  background-size: 30px auto;
  background-position: center;
  background-repeat: no-repeat;
  float: left;
  margin-right: 1rem;
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

  async onFormSubmit(e = {}, values = {}) {
    const { history } = this.props;
    let query = values;
    if (e) {
      query = e.target.value;
    }

    query = query.split(' ').join('+');
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}?printType=books&maxResults=40`);
    const data = await request.json();

    history.push({
      pathname: '/search',
      search: `?query=${query}`,
      state: {
        data: data.items || [],
      },
    });
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
            {this.props.user.avatar_url /* eslint-disable-line */
              ? (
                <AvatarWrapper img={this.props.user.avatar_url} /> /* eslint-disable-line */
              )
              : <AvatarStyle />}
            <Link to='/me'>
              {user.username}
            </Link>
          </NavItems>
          <NavItems>
            {/* eslint jsx-quotes: ["error", "prefer-single"] */}
            <Link to='/me-list'>Bookshelf</Link>
          </NavItems>
          <NavItems onClick={this.signout}><Button>Sign Out</Button></NavItems>
        </React.Fragment>
      );
    }


    return (
      <React.Fragment>
        <NavItems><Link to='/read-assessment'>Reading Assessment</Link></NavItems>
        <NavItems><Link to='/signin'><Button>Sign In</Button></Link></NavItems>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className='App'>
        <NavBar>
          <Link to='/home'><img style={{ width: '65%' }} src={Logo} alt='logo' /></Link>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, actions)(withRouter(App));
