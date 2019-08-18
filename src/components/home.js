import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as actions from '../actions/simpleAction';
import { ReactComponent as Avatar } from '../assets/icons/avatar.svg';

const Wrapper = styled.div`
  height: calc(100vh - 193px);
  display: flex;
`;
const WrapperNotice = styled.div`
  margin: auto;
`;
const WrapperUsers = styled(WrapperNotice)`
  padding-left: 8rem;
`;
const AvatarStyle = styled(Avatar)`
  width: 50px;
  margin-bottom: 15px;
  margin-right: 1rem;
  float: left;
`;

class Home extends React.Component {
  state = { users: [] }

  componentDidMount() {
    const { state } = this.props.location; {/* eslint-disable-line */}
    // if Dashboard component is rendered from a redirect from user signup page, fetch user's data
    if (state) {
      const token = localStorage.getItem('token');
      if (token) {
        const { getLoggedInUserProfile } = this.props;
        getLoggedInUserProfile();
      }
    }

    fetch(`${process.env.REACT_APP_HOSTNAME}/users`).then(res => res.json()).then(users => this.setState({ users }));
  }

  render() {
    const { users } = this.state;

    return (
      <Wrapper className="animated fadeIn">
        <WrapperNotice>
          <h2>Welcome to the BookStax community!</h2>
          <p>We have plenty of featuers we would still like to implement that will help improve the experience for our users. Some of the features we plan on releasing in the near future includes:</p>
          <p>While we continue to work on improving BookStax, take a look and see what other members are reading.</p>
          <ul style={{ padding: 0 }}>
            <li>A real time activity feed so you can get updates on what books are other members are reading.</li>
            <li>Private messaging to individual members</li>
            <li>Ability to integrate your social media accounts into your profile (twitter, instagram).</li>
            <li>Recommend a book to another member.</li>
            <li>Facebook login</li>
            <li>Bookshelf search filtering</li>
            <li>Making the website responsive</li>
            <li>and more...</li>
          </ul>
        </WrapperNotice>
        <WrapperUsers>
          {users.map(user => (
            user.avatar_url
              ? <Link to={`/user/${user.username}/${user.id}/`}><img style={{ height: '50px', borderRadius: '50%' }} src={user.avatar_url} alt={user.username} /></Link>
              : <Link to={`/user/${user.username}/${user.id}/`}><AvatarStyle /></Link>
          ))}
        </WrapperUsers>
      </Wrapper>
    );
  }
}

export default connect(null, actions)(Home);

Home.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
  getLoggedInUserProfile: PropTypes.func.isRequired,
};

Home.defaultProps = {
  location: {
    state: {},
  },
};
