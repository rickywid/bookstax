import React from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Routes from './routes';
import * as actions from './actions/simpleAction';
import Logo from './assets/images/logo.png';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
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

const InputWrapper = styled.div`
  display: inline-block;
`;

const Form = styled.form`
  input {
    background: none;
    border: 1px solid grey;
    border-radius: 4px;
    padding: 0 5px;
    height: 32px;
    margin-right: 1rem;
  }
  display: flex;
  margin-right: 1rem;
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
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
    <InputWrapper>
      <input {...input} placeholder={label} type={type} />
      {touched
        && ((error && <p className='error'>{error}</p>))}
    </InputWrapper>
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
        <NavItems>About</NavItems>
        <NavItems>About</NavItems>
        <NavItems>About</NavItems>
        <NavItems>Reading Test</NavItems>
        <NavItems><Button>Sign In</Button></NavItems>
      </React.Fragment>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className='App'>
        <NavBar>
          <Link to='/'><img src={Logo} alt='logo' /></Link>
          <NavRightSide>
            <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
              <Field component={this.renderField} type='text' name='search' label='search title, author, isbn' />
              <Button default type='submit'>Search</Button>
            </Form>
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
