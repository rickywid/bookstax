import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../actions/simpleAction';

// import styled from 'styled-components';

class Landing extends React.Component {
  componentDidMount() {
    console.log('landing');
  }

  handleSignIn = () => {
    window.open('http://localhost:3001/signin', '_self');
  }

  render() {
    return (
      <div className="landing">
        <button onClick={this.handleSignIn} type="button">Sign In With Google</button>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getUserProfile: () => dispatch(getUserProfile()),
});

// export default Landing;
export default connect(null, mapDispatchToProps)(Landing);
