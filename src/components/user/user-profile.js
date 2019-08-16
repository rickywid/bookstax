import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { Button } from 'antd';
import Api from '../../services/api';
import BookItem from './book-item';
import { ReactComponent as AvatarPlaceholder } from '../../assets/icons/avatar.svg';
import BookshelfList from './bookshelf-list';
import FavouriteBooks from './favourite-books';
import UserGenres from './user-genres';
import UserBio from './user-bio';
import UserSocial from './user-social';

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
  margin-top: 1rem;
  font-size: 12px;
`;
const Stat = styled.p`
  font-size: 40px;
`;
const ContentWrapper = styled.div`
  display: flex;
`;
const Sidebar = styled.aside`
  flex-basis: 30%;
  padding: 0 1rem;
  padding-right: 6rem;
`;
const DisplayName = styled.h2`
    font-size: 30px;
    margin-bottom: 0;
    font-weight: bold;
`;

const AvatarPlaceholderStyle = styled(AvatarPlaceholder)`
  height: 100px;
  margin-right: 2rem;
`;
const AvatarWrapper = styled.div`
  height: 100px !important;
  width: 100px !important;
  margin-right: 2rem !important;
  border-radius: 50%;
  overflow: hidden;
  background-image: ${props => (props.img ? `url(${props.img})` : '')};
  background-size: 100px auto;
  background-position: center;
  background-repeat: no-repeat;
`;
const ButtonStyle = styled(Button)`
  display: block;
  width: 100%;
  border: none !important;
  text-align: initial !important;
  padding: 0 !important;
  box-shadow: none !important;
`;

class UserProfile extends React.Component {
  api = new Api().Resolve();

  userId = window.location.pathname.split('/')[3];

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      showFavourites: false,
    };
  }

  async componentDidMount() {
    const user = await this.api.getUserProfile(this.userId);
    const data = await fetch(`${process.env.REACT_APP_HOSTNAME}/user/bookshelf/${user[0].list_id}`);
    const userList = await data.json();

    const data2 = await fetch(`${process.env.REACT_APP_HOSTNAME}/favourites/${this.userId}`);
    const userFavourites = await data2.json();

    const data3 = await fetch(`${process.env.REACT_APP_HOSTNAME}/user/${this.userId}/genre`);
    const userGenres = await data3.json();

    this.setState((prevState) => {
      const state = prevState;
      state.user = user[0]; {/* eslint-disable-line */}
      state.user.bookshelf = userList[0]; {/* eslint-disable-line */}
      state.user.favourites = userFavourites;
      state.user.genres = userGenres;
      return state;
    });
  }

  showFavourites(bool) {
    this.setState({ showFavourites: bool });
  }

  renderCurrentBooks() {
    const { user } = this.state;

    if (user.bookshelf.currently.length) {
      return user.bookshelf.currently.map((book, index) => <BookItem key={book.isbn} index={index} book={book} markBookCompleted={this.markBookCompleted} />);
    }

    return <div>you&apos;re not reading any books at the moment</div>;
  }

  render() {
    const { user, showFavourites } = this.state;
    const isAuthorized = window.location.pathname.split('/')[1] === 'me';

    if (Object.keys(user).length === 0 && user.constructor === Object) return <div />;

    return (
      <Wrapper className="animated fadeIn">
        <UserInfoWrapper>
          <UserInfo>
            {user.avatar_url
              ? (
                <AvatarWrapper img={user.avatar_url} />
              )
              : <AvatarPlaceholderStyle />}
            <InnerWrapper>
              <div>
                <DisplayName>{user.username}</DisplayName>
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
          <ContentWrapper>
            <Sidebar>
              <div style={{ marginBottom: '1rem' }}>
                <ButtonStyle onClick={() => this.showFavourites(false)} icon="unordered-list">Bookshelf</ButtonStyle>
                <ButtonStyle icon="star" onClick={() => this.showFavourites(true)}>Favourites</ButtonStyle>
                <ButtonStyle icon="message">Send message</ButtonStyle>
                <ButtonStyle icon="book">Recommend a book</ButtonStyle>
              </div>
              <UserSocial user={user} />
              <UserBio user={user} />
              <UserGenres user={user} />
              <Joined>
                Joined
                <span> </span>
                {moment(user.created_at).fromNow()}
              </Joined>
            </Sidebar>
            <div style={{ flexBasis: '70%', position: 'relative' }}>
              <Link to={`/user/${user.username}/${user.id}/list/${user.list_id}`} style={{ position: 'absolute', right: 0, top: -1 }}><ButtonStyle icon="unordered-list">View Full Bookshelf</ButtonStyle></Link>
              {!showFavourites ? <BookshelfList isAuthorized={isAuthorized} bookshelf={[user.bookshelf]} markBookCompleted={this.markBookCompleted} /> : <FavouriteBooks favourites={user.favourites} />}
            </div>
          </ContentWrapper>
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
    name: PropTypes.string,
    created_at: PropTypes.string,
  }),
};

UserProfile.defaultProps = {
  user: PropTypes.shape({
    name: '',
    created_at: '',
  }),
};
