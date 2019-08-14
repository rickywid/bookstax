import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form,
  Icon,
  Input,
  Button,
} from 'antd';
import styled from 'styled-components';
import { ReactComponent as GoogleIcon } from '../assets/icons/google.svg';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import * as actions from '../actions/simpleAction';

const LoginWrapper = styled.div`
  background: #d0e3ed;
  width: 500px;
  padding: 60px;
  margin: 0 auto;
`;

const SocialLoginWrapper = styled.div``;
const ErrorMsg = styled.p`
  display: inline;
  fontWeight: bold; 
  color: red; 
  textAlign: center;
`;
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

class SignIn extends Component {
  componentDidMount() {
    const { formErrors } = this.props;

    formErrors();
  }

  handleSubmit = (e) => {
    const { validateFields } = this.props.form; {/* eslint-disable-line */}
    const { signin, history } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        signin(values, history);
      }
    });
  };

  handleSignIn = () => {
    window.open('http://localhost:3001/signin', '_self');
  }

  render() {
    const { getFieldDecorator } = this.props.form; {/* eslint-disable-line */}
    const { errors } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Sign In</h1>
        <LoginWrapper>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('login', {
                rules: [{ required: true, message: 'Please input your email or username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username/Email"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button style={{ marginRight: '1rem' }} type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              {errors ? errors.map(error => <ErrorMsg>{error}</ErrorMsg>) : ''}
            </Form.Item>
          </Form>
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
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don&apos;t have an account?&nbsp;
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.auth.errors,
  };
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SignIn);

export default connect(mapStateToProps, actions)(WrappedNormalLoginForm);

SignIn.propTypes = {
  signin: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  formErrors: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf().isRequired,
};
