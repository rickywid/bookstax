import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { Button } from 'antd';
import Api from '../../services/api';
// import LoaderHOC from '../isLoading';
import CurrentlyReading from './currently-reading';
import { ReactComponent as Avatar } from '../../assets/icons/avatar.svg';

const Wrapper = styled.div`
  
`;
const UserInfoWrapper = styled.div`
  h3 {
    font-weight: bold;
  }
  p {
    margin: 0;
  }
`;
const UserInfo = styled.div`
    display: flex;
    align-items: center;
`;
const UserDetails = styled.div`
`;
const StatsWrapper = styled.div`
  li {
    display: inline-block;
    border-right: 1px solid #d5d5d5;
    padding: 0 15px;
  }
`;
const InnerWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
`;
const Stat = styled.p`
  font-size: 24px;
`;

class UserProfile extends React.Component {
  api = new Api().Resolve();

  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  async componentDidMount() {
    const userId = window.location.pathname.split('/')[2];
    const user = await this.api.getUserProfile(userId);
    const data = await fetch(`http://localhost:3001/user/bookshelf/${user[0].list_id}`);
    const userList = await data.json();

    this.setState((prevState) => {
      const state = prevState;
      state.user = user[0]; {/* eslint-disable-line */}
      state.user.bookshelf = userList[0]; {/* eslint-disable-line */}

      return state;
    });
    // this.setState({ user: user[0] });
  }

  renderCurrentBooks() {
    const { user } = this.state;

    if (user.bookshelf.currently.length) {
      return user.bookshelf.currently.map((book, index) => <CurrentlyReading key={book.isbn} index={index} book={book} markBookCompleted={this.markBookCompleted} />);
    }

    return <div>you&apos;re not reading any books at the moment</div>;
  }

  render() {
    const { user } = this.state;

    if (Object.keys(user).length === 0 && user.constructor === Object) return <div />;

    return (
      <Wrapper>
        <UserInfoWrapper>
          <UserInfo>
            <Avatar style={{ height: '100px', marginRight: '2rem' }} />
            <InnerWrapper>
              <div>
                <h3>{user.name}</h3>
                <Button><Link to="/user/edit">Edit Profile</Link></Button>
              </div>
              <StatsWrapper>
                <ul>
                  <li>
                    <Stat>{user.bookshelf.backlog.length}</Stat>
                    <p>Backlog</p>
                  </li>
                  <li>
                    <Stat>{user.bookshelf.currently.length}</Stat>
                    <p>Current</p>
                  </li>
                  <li>
                    <Stat>{user.bookshelf.completed.length}</Stat>
                    <p>Completed</p>
                  </li>
                </ul>
              </StatsWrapper>
            </InnerWrapper>
          </UserInfo>
          <p>{user.email}</p>
          <p>
            Joined
            <span> </span>
            {moment(user.created_at).fromNow()}
          </p>
          <p><Link to="/me-list">Bookshelf</Link></p>
          <button type="button">Send e-mail</button>
        </UserInfoWrapper>
        <UserDetails>
          <h4>Currently Reading</h4>
          {this.renderCurrentBooks()}
        </UserDetails>
      </Wrapper>
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
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};
