import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BookshelfLikes = (props) => {
  const { users, loggedInUserId } = props;

  return (
    <div>
      <ul>
        {users.map((user) => {
          if (user.id === loggedInUserId) {
            /* eslint jsx-quotes: ["error", "prefer-single"] */
            return <li key={user.name}><Link to='/me'>{user.name}</Link></li>;
          }

          return <li key={user.name}><Link to={`/user/${user.id}`}>{user.name}</Link></li>;
        })}
      </ul>
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
