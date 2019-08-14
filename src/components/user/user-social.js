import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as InstagramSVG } from '../../assets/icons/instagram.svg';
import { ReactComponent as TwitterSVG } from '../../assets/icons/twitter.svg';

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;
const InstagramSVGStyle = styled(InstagramSVG)`
  height: 20px;
  margin-right: 1rem;
`;
const TwitterSVGStyle = styled(TwitterSVG)`
  height: 20px;
  margin-right: 1rem;
`;
const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

class UserSocial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.setState((prevState) => {
      const { user } = this.props;
      const state = prevState;

      state.user = user;
      return state;
    });
  }

  render() {
    const { user } = this.state;
    const isAuthorized = window.location.pathname.split('/')[1] === 'me';

    let el;
    if (user.instagram_id || user.twitter_id) {
      el = (
        <React.Fragment>
          {user.instagram_id
            ? (
              <SocialWrapper>
                <InstagramSVGStyle />
                <a target="_blank" rel="noopener noreferrer" href={`https://www.instagram.com/${user.instagram_id}/`}>{user.instagram_id}</a>
              </SocialWrapper>
            )
            : ''
          }
          {user.twitter_id
            ? (
              <SocialWrapper>
                <TwitterSVGStyle />
                <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/${user.twitter}`}>{user.twitter_id}</a>
              </SocialWrapper>
            )
            : ''
          }
        </React.Fragment>
      );
    } else if (isAuthorized) {
      el = <Link to={{ pathname: '/settings', state: { user } }}>Add your social accounts</Link>;
    } else {
      el = '';
    }

    return (
      <Wrapper>
        {el}
      </Wrapper>
    );
  }
}

export default UserSocial;

UserSocial.propTypes = {
  user: PropTypes.shape({}).isRequired,
};
