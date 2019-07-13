import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Api from '../../services/api';

class Me extends React.Component {
  api = new Api().Resolve();

  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  // async componentDidMount() {
  //   const userId = this.state.user.id;
  // }

  render() {
    const { user } = this.state;
    return (
      <div className='user-profile'>
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
        { /* eslint jsx-quotes: ["error", "prefer-single"] */ }
        <Link to='/me-list'>Bookshelf</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.getUser,
  };
}

export default connect(mapStateToProps, null)(Me);

Me.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};
