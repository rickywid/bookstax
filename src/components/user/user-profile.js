import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import Api from '../../services/api';
import CurrentlyReading from './currently-reading';
import { ReactComponent as Avatar } from '../../assets/icons/avatar.svg';
import BookshelfList from './bookshelf-list';
import FavouriteBooks from './favourite-books';

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
    margin-bottom: 1.5rem;
`;
const UserDetails = styled.div`
`;
const StatsWrapper = styled.div`
  li {
    display: inline-block;
    border-right: 1px solid #0000000d;
    padding: 0 15px;
  }
`;
const InnerWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
`;
const Joined = styled.p`
  font-size: 12px;
`;
const StyledLink = styled(Link)`
  display: block;
  font-size: 12px;
`;
const Stat = styled.p`
  font-size: 40px;
`;
const TabsWrapper = styled.ul`
  margin: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  border-top: 1px solid #8b8b8b82;
  border-bottom: 1px solid #8b8b8b82;
`;
const Tabs = styled.li`
  display: inline-block;
  margin-right: 1rem;
  padding: 6px 12px;
  border-left: ${props => (props.index === props.tabState ? '1px solid #8b8b8b82' : 'none')};;
  border-right: ${props => (props.index === props.tabState ? '1px solid #8b8b8b82' : 'none')};
  background: ${props => (props.index === props.tabState ? '#d8e1ef' : 'none')};
`;
const TabBtn = styled.button`
  background: none;
  border: none;
`;

class UserProfile extends React.Component {
  api = new Api().Resolve();

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      activeTab: 0,
    };
  }

  async componentDidMount() {
    const userId = window.location.pathname.split('/')[2];
    const user = await this.api.getUserProfile(userId);
    const data = await fetch(`http://localhost:3001/user/bookshelf/${user[0].list_id}`);
    const userList = await data.json();

    const data2 = await fetch(`http://localhost:3001/favourites/${userId}`);
    const userFavourites = await data2.json();

    this.setState((prevState) => {
      const state = prevState;
      state.user = user[0]; {/* eslint-disable-line */}
      state.user.bookshelf = userList[0]; {/* eslint-disable-line */}
      state.user.favourites = userFavourites;

      return state;
    });
  }

  toggleTabs(index) {
    this.setState({ activeTab: index });
  }

  renderCurrentBooks() {
    const { user } = this.state;

    if (user.bookshelf.currently.length) {
      return user.bookshelf.currently.map((book, index) => <CurrentlyReading key={book.isbn} index={index} book={book} markBookCompleted={this.markBookCompleted} />);
    }

    return <div>you&apos;re not reading any books at the moment</div>;
  }

  render() {
    const { user, activeTab } = this.state;
    const isAuthorized = window.location.pathname.split('/')[1] === 'me';

    if (Object.keys(user).length === 0 && user.constructor === Object) return <div />;

    return (
      <Wrapper>
        <UserInfoWrapper>
          <UserInfo>
            <Avatar style={{ height: '100px', marginRight: '2rem' }} />
            <InnerWrapper>
              <div>
                <h3>{user.name}</h3>
                <Joined>
                  Joined
                  <span> </span>
                  {moment(user.created_at).fromNow()}
                </Joined>
                <StyledLink to={`/user/${user.id}/list/${user.list_id}`}>My Bookshelf</StyledLink>
                <StyledLink>Send email</StyledLink>
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
        </UserInfoWrapper>
        <UserDetails>
          <TabsWrapper>
            <Tabs index={0} tabState={activeTab}><TabBtn onClick={() => this.toggleTabs(0)}>Bookshelf</TabBtn></Tabs>
            <Tabs index={1} tabState={activeTab}><TabBtn onClick={() => this.toggleTabs(1)}>Favourite Books</TabBtn></Tabs>
          </TabsWrapper>
          {activeTab === 0 ? <BookshelfList isAuthorized={isAuthorized} bookshelf={[user.bookshelf]} markBookCompleted={this.markBookCompleted} /> : <FavouriteBooks favourites={user.favourites} />}
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
