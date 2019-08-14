import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

class UserBio extends Component {
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
    let text = '';

    if (isAuthorized) {
      text = <Link to={{ pathname: '/settings', state: { user } }}>Add a description</Link>;
    }

    return (
      <Wrapper>
        <p>{user.description ? user.description : text}</p>
      </Wrapper>
    );
  }
}

export default UserBio;

UserBio.propTypes = {
  user: PropTypes.shape({}).isRequired,
};
