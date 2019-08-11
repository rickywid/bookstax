import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Avatar } from '../../assets/icons/avatar.svg';

const ListWrapper = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
`;
const ListItem = styled.li`
  list-style: none;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;
const AvatarStyle = styled(Avatar)`
  width: 30px;
  margin-right: 1rem;
  float: left;
`;

const BookshelfLikes = (props) => {
  const { users, loggedInUserId } = props;

  return (
    <div>
      <ListWrapper>
        {users.map((user) => {
          if (user.id === loggedInUserId) {
            /* eslint jsx-quotes: ["error", "prefer-single"] */
            return (
              <ListItem key={user.name}>
                <AvatarStyle />
                <Link to='/me'>{user.name}</Link>
              </ListItem>
            );
          }

          return (
            <ListItem key={user.name}>
              <AvatarStyle />
              <Link to={`/user/${user.username}/${user.id}`}>{user.name}</Link>
            </ListItem>
          );
        })}
      </ListWrapper>
    </div>
  );
};

export default BookshelfLikes;

BookshelfLikes.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  loggedInUserId: PropTypes.number.isRequired,
};
