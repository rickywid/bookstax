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
} from 'antd';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;
const { Option } = Select;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const genres = ['Art', 'Biography', 'Business', 'Chick Lit', 'Childrens\'s', 'Christian', 'Classics', 'Comics', 'Contemporary', 'Cookbooks', 'Crime', 'Ebooks', 'Fantasy', 'Fiction', 'Gay and Lesbian', 'Graphic Novels', 'Historical Fiction', 'History', 'Horror', 'Humor and Comedy', 'Manga', 'Memoir', 'Music', 'Mystery', 'Nonfiction', 'Paranormal', 'Philosophy', 'Poetry', 'Psychology', 'Religion', 'Romance', 'Science', 'Science Fiction', 'Self Help', 'Suspense', 'Spirituality', 'Sports', 'Thriller', 'Travel', 'Young Adult'];
const countries = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegowina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, the Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia (Hrvatska)', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'France Metropolitan', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and Mc Donald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran (Islamic Republic of)', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People\'s Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao, People\'s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia (Slovak Republic)', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Pierre and Miquelon', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands (British)', 'Virgin Islands (U.S.)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zambia', 'Zimbabwe'];

class UserEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
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
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
                  initialValue: user.country,
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
                {getFieldDecorator('checkbox-group', {
                  initialValue: ['A', 'B'],
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                      {genres.map(genre => (
                        <Col key={genre} span={4}>
                          <Checkbox value={genre}>{genre}</Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </Checkbox.Group>,
                )}
              </Form.Item>

              <button type="button">UPLOAD AVATAR</button>

              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                  Log in
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
    getFieldDecorator: PropTypes.shape({}).isRequired,
    getFieldsError: PropTypes.shape({}).isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
};
