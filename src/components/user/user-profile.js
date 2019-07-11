import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    console.log('user profile mounted');
    const userId = window.location.pathname.split('/')[2];
    fetch(`http://localhost:3001/user/${userId}`).then(res => res.json()).then((user) => {
      this.setState({ user: user[0] });
    });
  }

  render() {
    const { user } = this.state;
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
        <Link to={`/user/${user.id}/edit`}>Edit profile</Link>
        <Link to={`/user/${user.id}/list/${user.list_id}`}>Bookshelf</Link>
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
