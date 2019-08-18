import React from 'react';
import {
  Tabs,
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Row,
  Col,
  message,
} from 'antd';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import { genres, countries } from '../../const';
import UploadFile from '../../helpers/upload';

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
      files: [],
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
    const { user, files } = this.state;

    e.preventDefault();
    form.validateFields(async (err, values) => {
      const data = values;
      data.file = user.avatar_url || files[0]; {/* eslint-disable-line */}

      if (!err) {
        await this.api.updateUserProfile(user.id, data);
        message.success('Your profile has been successfully updated');

        history.push({
          pathname: '/me',
          state: data,
        });
      }
    });
  };

  handleFileUpload = (action = 'add', filename) => {
    this.setState((prevState) => {
      const state = prevState;

      if (action === 'remove') {
        state.files = [];
      } else {
        state.files.push(filename);
      }

      return state;
    });
  }

  removeAvatar = () => {
    this.setState((prevState) => {
      const state = prevState;
      state.files = [];
      state.user.avatar_url = '';

      return state;
    });
  }

  callback = () => {
    console.log('callback');
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form; {/* eslint-disable-line */}
    const { user, files } = this.state;

    return (
      <div className="user-edit animated fadeIn">
        <Tabs animated={false} defaultActiveKey="1" onChange={() => this.callback()}>
          <TabPane tab="Profile" key="1">
            <Form onSubmit={this.handleSubmit}>

              {/* NAME */}

              <Form.Item label="Name">
                {getFieldDecorator('name', {
                  initialValue: user.name,
                  rules: [{ required: false, message: 'Please input a name', whitespace: true }],
                })(<Input />)}
              </Form.Item>

              {/* USER NAME */}

              {/* <Form.Item
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
                  initialValue: user.username,
                  rules: [{ required: false, message: 'Please input a display name', whitespace: true }],
                })(<Input />)}
              </Form.Item>* /}

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
              <Form.Item>
                {!user.avatar_url
                  ? (
                    <UploadFile files={files.length} handleFileUpload={this.handleFileUpload} />
                  )
                  : <Button onClick={this.removeAvatar}>Remove Avatar</Button>
                }
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Settings" disabled key="2">
            <p>Display email</p>
            <p>Display location</p>
            <button type="button">Delete Account</button>
          </TabPane>
          <TabPane tab="Connect" disabled key="3">
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
