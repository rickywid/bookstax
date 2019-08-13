import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
} from 'antd';
import styled from 'styled-components';
import * as actions from '../actions/simpleAction';

const LoginWrapper = styled.div`
  background: #d0e3ed;
  width: 500px;
  padding: 60px;
  margin: 0 auto;
`;

class SignUp extends Component {
  state = {
    confirmDirty: false,
  };

  componentDidMount() {
    const { formErrors } = this.props;

    formErrors();
  }

  handleSubmit = (e) => {
    const { form, signup, history } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        signup(values, history);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const { confirmDirty } = this.state;
    const { value } = e.target;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { confirmDirty } = this.state;
    const { form } = this.props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form; {/* eslint-disable-line */}
    const { errors } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
        <LoginWrapper>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Username">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          {errors ? errors.map(error => <p style={{ fontWeight: 'bold', color: 'red', textAlign: 'center' }}>{error}</p>) : ''}
        </LoginWrapper>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account?&nbsp;
          <Link to="/signin">Sign In</Link>
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

const WrappedSignUpForm = Form.create({ name: 'register' })(SignUp);

export default connect(mapStateToProps, actions)(WrappedSignUpForm);


SignUp.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  formErrors: PropTypes.func.isRequired,
};
