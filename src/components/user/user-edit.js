import React from 'react';
// import styled from 'styled-components';

class UserEdit extends React.Component {
  componentDidMount() {
    console.log('user edit mounted');
  }

  render() {
    return (
      <div className="user-edit">
        <p>User Edit</p>
      </div>
    );
  }
}

export default UserEdit;
