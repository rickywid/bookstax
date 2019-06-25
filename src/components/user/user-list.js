import React from 'react';
// import styled from 'styled-components';

class UserList extends React.Component {
  componentDidMount() {
    console.log('user list mounted');
  }

  render() {
    return (
      <div className="user-list">
        <p>User List</p>
      </div>
    );
  }
}

export default UserList;
