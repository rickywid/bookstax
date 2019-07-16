import React from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './App.css';
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

  onFormSubmit(values) {
    const { searchResults, history, reset } = this.props;
    searchResults(values, history);
    reset();
  }

  signout() {
    const { signOut } = this.props;
    signOut();
  }

  renderField = ({
    input, label, type, meta: { touched, error },
  }) => (
    <div>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched
          && ((error && <span>{error}</span>))}
      </div>
    </div>
  )

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
    const { handleSubmit, error } = this.props;

    return (
      <div className='App'>
        <NavBar>
          <Logo><Link to='/'>BookStax</Link></Logo>
          <NavList>{this.renderNavLinks()}</NavList>
          <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
            <Field component={this.renderField} type='text' name='search' label='search title, author, isbn' />
            <button type='submit'>Searchddd</button>
            {error}
          </form>
        </NavBar>
        {Routes}
      </div>
    );
  }
}

const validate = (values) => {
  const errors = { values };
  if (!values.search) {
    errors.search = 'Cannot be blank';
  }

  return errors;
};

function mapStateToProps(state) {
  return {
    user: state.getUser,
    isAuth: state.auth,
  };
}

// export default connect(mapStateToProps, actions)(App);

App.propTypes = {
  user: PropTypes.shape({}).isRequired,
  isAuth: PropTypes.shape({ authenticated: PropTypes.bool.isRequired }).isRequired,
  signOut: PropTypes.func.isRequired,
  getLoggedInUserProfile: PropTypes.func.isRequired,
  searchResults: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({}).isRequired,
  reset: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({
    form: 'searchBooks',
    fields: ['search'],
    validate,
  }),
  connect(mapStateToProps, actions),
)(withRouter(App));
