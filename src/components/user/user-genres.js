import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Header2 } from '../../styled-components/header';

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const ButtonStyle = styled(Button)`
  margin-top: 1rem;
`;
const LinkStyle = styled(Link)`
  display: block
`;

class UserGenres extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        genres: [],
      },
    };
  }

  componentDidMount() {
    this.setState((prevState) => {
      const { user } = this.props;
      const state = prevState;
      state.user = user;
      state.user.genres = state.user.genres || [];

      return state;
    });
  }

  render() {
    const { user } = this.state;
    const isAuthorized = window.location.pathname.split('/')[1] === 'me';
    let text = '';

    if (isAuthorized) {
      text = <LinkStyle to={{ pathname: '/settings', state: { user } }}>Add genres to your list</LinkStyle>;
    }
    return (
      <Wrapper>
        <Header2>Genres</Header2>
        {user.genres.length
          ? (
            <ul>
              {user.genres.map(genre => <li key={genre.genre}>{genre.genre}</li>)}
            </ul>
          )
          : text
        }

        <ButtonStyle>Recommend a book</ButtonStyle>
      </Wrapper>
    );
  }
}

export default UserGenres;

UserGenres.propTypes = {
  user: PropTypes.PropTypes.shape({}).isRequired,
};
