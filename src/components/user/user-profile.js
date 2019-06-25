import React from 'react';
// import styled from 'styled-components';

class UserProfile extends React.Component {
  componentDidMount() {
    console.log('user profile mounted');
  }

  render() {
    return (
      <div className="user-profile">
        <p>User Profile</p>
      </div>
    );
  }
}

export default UserProfile;
