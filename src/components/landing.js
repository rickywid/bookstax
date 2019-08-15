import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Icon,
  Input,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../actions/simpleAction';
import { ReactComponent as GoogleIcon } from '../assets/icons/google.svg';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as ReadingSVG } from '../assets/images/reading.svg';

const LandingWrapper = styled.div`
  display: flex;  
  height: calc(100vh - 113px);
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
  background: #00000005;
  border: 1px solid #00000005;
  border-radius: 4px;
  box-shadow: -4px 6px 5px 0px rgba(0,0,0,0.35);
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
const ErrorMsg = styled.p`
  display: inline;
  fontWeight: bold; 
  color: red; 
  textAlign: center;
`;

const ButtonStyle = styled(Button)`
  margin-right: 1rem;
`;

const ButtonSocialStyle = styled(Button)`
  width: 100%;
  font-weight: bold;
  background: #fff;
  margin-bottom: 1rem;
  height: auto;
  display: flex !important;
  text-align: initial;
  align-items: center;
  padding: 7px 7px 7px 20px;
  color: black;
`;

const GoogleIconStyle = styled(GoogleIcon)`
  height: 20px
  margin-right: 1rem
`;
const FacebookIconStyle = styled(FacebookIcon)`
  height: 20px
  margin-right: 1rem
`;

const ReadingSVGStyle = styled(ReadingSVG)`
  height: auto;
  width: 90%;
`;

const style1 = {
  width: '100%',
  textAlign: 'center',
  borderBottom: '1px solid #c7c7c7',
  lineHeight: '0.1em',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '2rem 0',
};
const style2 = {
  background: '#fafafa',
  padding: '0 10px',
  color: '#58646a',
};

class Landing extends React.Component {
  componentDidMount() {
    console.log('landing');
  }

  handleSubmit = (e) => {
    const { signin, history } = this.props;
    const { validateFields } = this.props.form; {/* eslint-disable-line */}
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
      <LandingWrapper className="animated fadeIn">
        <LandingLeft>
          <Header>Unlock Your Greatest Superpower</Header>
          <p>Keep track of all the past, present and future books you want to read. Check out other members profiles and see what books are on their list and maybe even recommend each other a book to read. </p>
          <ReadingSVGStyle />
        </LandingLeft>
        <LandingRight>
          <LoginWrapper>
            <h2>SIGN IN</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('login', {
                  rules: [{ required: true, message: 'Please input your email or username' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email/Username"
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
                <ButtonStyle type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </ButtonStyle>
                {errors ? errors.map(error => <ErrorMsg>{error}</ErrorMsg>) : ''}
              </Form.Item>
            </Form>
            <p style={style1}>
              <span style={style2}>OR</span>
            </p>
            <SocialLoginWrapper>
              <ButtonSocialStyle onClick={this.handleSignIn}>
                <GoogleIconStyle />
                Sign In With Google
              </ButtonSocialStyle>
              <ButtonSocialStyle onClick={this.handleSignIn}>
                <FacebookIconStyle />
                Sign In With Facebook
              </ButtonSocialStyle>
            </SocialLoginWrapper>
          </LoginWrapper>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Don&apos;t have an account?&nbsp;
            <Link to="/signup">Sign Up</Link>
          </p>
        </LandingRight>
      </LandingWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.auth.errors,
  };
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Landing);

export default connect(mapStateToProps, actions)(withRouter(WrappedNormalLoginForm));


Landing.propTypes = {
  errors: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  signin: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
