import React from 'react';
import {
  Tabs,
  Form,
  Icon,
  Input,
  Button,
  Tooltip,
  Select,
  Checkbox,
  Row,
  Col,
  message,
} from 'antd';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import { genres, countries } from '../../const';

const { TabPane } = Tabs;
const { Option } = Select;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UserEdit extends React.Component {
  api = new Api().Resolve();

  constructor(props) {
    super(props);

    this.state = {
      user: {
        genres: [],
      },
    };
  }

  componentDidMount() {
    const { user } = this.props.location.state; {/* eslint-disable-line */}

    this.setState((prevState) => {
      const state = prevState;
      state.user = user;

      return state;
    });
  }

  handleSubmit = (e) => {
    const { form, history } = this.props;
    const { user } = this.state;

    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        await this.api.updateUserProfile(user.id, values);
        message.success('Your profile has been successfully updated');
        history.push({
          pathname: '/me',
          state: values,
        });
      }
    });
  };

  callback(key) {
    console.log(this, key);
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form; {/* eslint-disable-line */}
    const { user } = this.state;

    return (
      <div className="user-edit">
        <Tabs animated={false} defaultActiveKey="1" onChange={() => this.callback()}>
          <TabPane tab="Profile" key="1">
            <Form onSubmit={this.handleSubmit}>

              {/* USER NAME */}

              <Form.Item
                label={
                  (
                    <span>
                      Username&nbsp;
                      <Tooltip title="Display name on your profile">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  )
                }
              >
                {getFieldDecorator('username', {
                  initialValue: user.name,
                  rules: [{ required: false, message: 'Please input a display name', whitespace: true }],
                })(<Input />)}
              </Form.Item>

              {/* EMAIL */}

              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  initialValue: user.email,
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: false,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>

              {/* COUNTRY */}

              <Form.Item label="Country" hasFeedback>
                {getFieldDecorator('country', {
                  initialValue: user.location,
                  rules: [{ required: false, message: 'Please select your country!' }],
                })(
                  <Select placeholder="Please select a country">
                    {countries.map(country => <Option key={country} value={country}>{country}</Option>)}
                  </Select>,
                )}
              </Form.Item>

              {/* DESCRIPTION */}

              <Form.Item label="Bio">
                {getFieldDecorator('bio', {
                  initialValue: user.description,
                  rules: [{ required: false, message: 'Please input a display name', whitespace: true }],
                })(<Input.TextArea
                  placeholder="Tell us about yourself"
                />)}
              </Form.Item>

              {/* SOCIAL MEDIA */}

              <Form.Item label="Twitter">
                {getFieldDecorator('twitter', {
                  initialValue: user.twitter_id,
                  rules: [{ required: false, message: 'Please input your username!' }],
                })(
                  <Input />,
                )}
              </Form.Item>
              <Form.Item label="Instagram">
                {getFieldDecorator('instagram', {
                  initialValue: user.instagram_id,
                  rules: [{ required: false, message: 'Please input your username!' }],
                })(
                  <Input />,
                )}
              </Form.Item>

              {/* GENRES */}

              <Form.Item label="I'm interested in the following genres">
                {getFieldDecorator('genres', {
                  initialValue: user.genres.map(genre => genre.id),
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                      {genres.map((genre, index) => (
                        <Col key={genre} span={4}>
                          <Checkbox value={index + 1}>{genre}</Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </Checkbox.Group>,
                )}
              </Form.Item>

              <button type="button">UPLOAD AVATAR</button>

              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Settings" key="2">
            <p>Display email</p>
            <p>Display location</p>
            <button type="button">Delete Account</button>
          </TabPane>
          <TabPane tab="Connect" key="3">
            <button type="button">Connect to Twitter</button>
            <button type="button">Connect to Instagram</button>
            <button type="button">Connect to Facebook</button>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const WrappedUserEdit = Form.create({ name: 'settings' })(UserEdit);

export default WrappedUserEdit;

UserEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      user: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldsError: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
