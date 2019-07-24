import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getUserProfile } from '../actions/simpleAction';
import { ReactComponent as GoogleIcon } from '../assets/icons/google.svg';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as ReadingSVG } from '../assets/images/reading.svg';

const Form = styled.form`
  
  margin: 0 auto;
`;
const InputWrapper = styled.div`
  input {
    height: 44px;
    width: 100%;
    padding: 5px;
    margin-bottom: 1rem;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
  }
`;
const LandingWrapper = styled.div`
  display: flex;  
  height: calc(100vh - 66px);
`;
const LandingLeft = styled.div`
  flex: 1;
  margin: auto;
`;
const LandingRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: auto;
`;
const LoginWrapper = styled.div`
  background: #d0e3ed;
  width: 80%;
  padding: 60px;
  margin: 0 auto;
`;
const Header = styled.h2`
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 0;
  line-height: 1;
  margin-bottom: 2rem;
`;

const SocialLoginWrapper = styled.div``;

const btnStyle = {
  width: '85%',
  fontWeight: 'bold',
  background: '#fff',
  marginBottom: '1rem',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: '7px 7px 7px 20px',
  color: 'black',
};

const socialIconStyle = {
  height: '20px',
  marginRight: '1rem',
};

const readingSVGStyle = {
  height: 'auto',
  width: '90%',
};

const style1 = {
  width: '100%',
  textAlign: 'center',
  borderBottom: '1px solid #000',
  lineHeight: '0.1em',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '2rem 0',
};
const style2 = {
  background: '#d0e3ed',
  padding: '0 10px',
};

class Landing extends React.Component {
  componentDidMount() {
    console.log('landing');
  }

  onFormSubmit(values) {
    console.log(values);
    const { reset } = this.props;
    // searchResults(values, history);
    reset();
  }

  handleSignIn = () => {
    window.open('http://localhost:3001/signin', '_self');
  }

  renderField = ({
    input, label, type, meta: { touched, error },
  }) => (
    <div>
      <label>{label}</label> {/* eslint-disable-line */}
      <InputWrapper>
        <input {...input} type={type} />
        {touched
          && ((error && <p className="error">{error}</p>))}
      </InputWrapper>
    </div>
  )

  render() {
    const { handleSubmit, error } = this.props;
    return (
      <LandingWrapper>
        <LandingLeft>
          <Header>Grab A Book And Free Your Mind</Header>
          <p>Keep track of all the past, present and future books you want to read. Check out other members profiles and see what books are on their list and maybe even recommend each other a book to read. </p>
          <ReadingSVG style={readingSVGStyle} />
        </LandingLeft>
        <LandingRight>
          <LoginWrapper>
            <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
              <Field component={this.renderField} type="text" name="email" label="Email" />
              <Field component={this.renderField} type="password" name="Password" label="Password" />
              <Button style={{ fontWeight: 'bold' }} default type="submit">Sign In</Button>
            </Form>
            {error}
            <p style={style1}>
              <span style={style2}>OR</span>
            </p>
            <SocialLoginWrapper>
              <Button style={btnStyle} onClick={this.handleSignIn}>
                <GoogleIcon style={socialIconStyle} />
                Sign In With Google
              </Button>
              <Button style={btnStyle} onClick={this.handleSignIn}>
                <FacebookIcon style={socialIconStyle} />
                Sign In With Facebook
              </Button>
            </SocialLoginWrapper>
          </LoginWrapper>
        </LandingRight>
      </LandingWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserProfile: () => dispatch(getUserProfile()),
});

const validate = (values) => {
  const errors = { values };
  if (!values.email) {
    errors.email = 'Cannot be blank';
  }

  if (!values.password) {
    errors.password = 'Cannot be blank';
  }

  return errors;
};

export default compose(
  reduxForm({
    form: 'signin',
    fields: ['email', 'password'],
    validate,
  }),
  connect(null, mapDispatchToProps),
)(Landing);


Landing.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({}).isRequired,
  reset: PropTypes.func.isRequired,
};
