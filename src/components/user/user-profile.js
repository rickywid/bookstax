import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class UserProfile extends React.Component {
  componentDidMount() {
    console.log('user profile mounted');
  }

  render() {
    const { user } = this.props;
    const userId = window.location.pathname.split('/')[1];
    return (
      <div className="user-profile">
        <p>User Profile</p>
        <p>
Name:
          {user.name}
        </p>
        <p>
Description:
          {user.description}
        </p>
        <p>
Joined:
          {user.created_at}
        </p>
        <Link to={`/user/${userId}/edit`}>Edit profile</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.getUser,
  };
}

export default connect(mapStateToProps, null)(UserProfile);

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};
