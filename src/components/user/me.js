import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Modal, Button } from 'antd';
import Api from '../../services/api';
import LoaderHOC from '../isLoading';
import { ReactComponent as Medal } from '../../assets/icons/medal.svg';
import { ReactComponent as AvatarPlaceholder } from '../../assets/icons/avatar.svg';
import BookshelfList from './bookshelf-list';
import FavouriteBooks from './favourite-books';
import * as actions from '../../actions/simpleAction';
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

  a {
    font-size: 12px;
  }
`;
const StyledLink = styled(Link)`
  
`;
const Stat = styled.p`
  font-size: 40px;
`;
const StatTitle = styled.p`
  font-size: 12px;
  color: #00000073;
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
  background: transparent;
`;

class Me extends React.Component {
  api = new Api().Resolve();

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      displayCongratssModal: false,
      showFavourites: false,
    };

    this.markBookCompleted = this.markBookCompleted.bind(this);
  }

  async componentDidMount() {
    const user = this.props.user; {/* eslint-disable-line */}
    const { state } = this.props.location; {/* eslint-disable-line */}
    const { getLoggedInUserProfile } = this.props;

    if (state) {
      getLoggedInUserProfile();
      user.name = state.username;
      user.location = state.country;
      user.description = state.bio;
      user.genres = state.genres;
      user.instagram_id = state.instagram;
      user.twitter_id = state.twitter;
      user.avatar_url = state.file;
    }

    const bookshelf = await this.api.getUserBookshelf(user.list_id);
    const favourites = await this.api.getUserBookshelfFavourites(user.id);
    const genres = await this.api.getUserGenres(user.id);

    this.setState((prevState) => {
      const state2 = prevState;
      state2.user = user;
      state2.user.bookshelf = bookshelf;
      state2.user.favourites = favourites;
      state2.user.genres = genres;

      return state2;
    });
  }

  handleOk = () => {
    this.setState({
      displayCongratssModal: false,
    });
  };

  handleCancel = () => {
    this.setState({
      displayCongratssModal: false,
    });
  };

  async markBookCompleted(index) {
    const { user } = this.props;
    const list = this.state;
    const book = list.user.bookshelf[0].currently.splice(index, 1);
    book[0].status = 'completed';
    const backlog = list.user.bookshelf[0].backlog; {/* eslint-disable-line */}
    const current = list.user.bookshelf[0].currently;
    const completed = [book[0], ...list.user.bookshelf[0].completed];

    await this.api.updateUserBookshelf(user.list_id, { data: [backlog, completed, current] });
    this.setState({ displayCongratssModal: true });
  }

  showFavourites(bool) {
    this.setState({ showFavourites: bool });
  }

  render() {
    const { user, displayCongratssModal, showFavourites } = this.state;
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
                    <Stat>{user.bookshelf[0].backlog.length}</Stat>
                    <StatTitle>Backlog</StatTitle>
                  </li>
                  <li>
                    <Stat>{user.bookshelf[0].currently.length}</Stat>
                    <StatTitle>Current</StatTitle>
                  </li>
                  <li>
                    <Stat>{user.bookshelf[0].completed.length}</Stat>
                    <StatTitle>Completed</StatTitle>
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
                <ButtonStyle icon="unordered-list" onClick={() => this.showFavourites(false)}>Bookshelf</ButtonStyle>
                <ButtonStyle icon="star" onClick={() => this.showFavourites(true)}>Favourites</ButtonStyle>
                <StyledLink to={{ pathname: '/settings', state: { user } }}>
                  <ButtonStyle icon="edit">Edit Profile</ButtonStyle>
                </StyledLink>
                <ButtonStyle icon="book" disabled>Recommend a book</ButtonStyle>
              </div>

              <UserSocial user={user} />
              <UserBio user={user} />
              <UserGenres user={user} />
            </Sidebar>
            <div style={{ flexBasis: '70%', position: 'relative' }}>
              <Link to="me-list" style={{ position: 'absolute', right: 0, top: -1 }}><ButtonStyle icon="unordered-list">View Full Bookshelf</ButtonStyle></Link>
              {!showFavourites ? <BookshelfList isAuthorized={isAuthorized} bookshelf={user.bookshelf} markBookCompleted={this.markBookCompleted} /> : <FavouriteBooks favourites={user.favourites} />}
            </div>
          </ContentWrapper>
        </UserDetails>
        <Modal
          title=""
          visible={displayCongratssModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="congrats-modal"
          width={286}
          footer={null}
        >
          <div>
            <h3>Congratulations!</h3>
            <Medal />
          </div>
        </Modal>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.getUser,
  };
}

export default connect(mapStateToProps, actions)(LoaderHOC('user')(Me));

Me.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    created_at: PropTypes.string,
    list_id: PropTypes.number,
    location: PropTypes.string,
    description: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.shape({})),
    instagram_id: PropTypes.string,
    twitter_id: PropTypes.string,
    avatar_url: PropTypes.string,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      username: PropTypes.string,
      country: PropTypes.string,
      bio: PropTypes.string,
      genres: PropTypes.arrayOf(PropTypes.shape({})),
      instagram: PropTypes.string,
      twitter: PropTypes.string,
      file: PropTypes.string,
    }),
  }),
  getLoggedInUserProfile: PropTypes.func.isRequired,
};

Me.defaultProps = {
  user: {
    id: null,
    name: '',
    created_at: '',
    list_id: null,
    location: '',
    description: '',
    genres: [],
    instagram_id: '',
    twitter_id: '',
    avatar_url: '',
  },
  location: {
    state: {
      username: '',
      country: '',
      bio: '',
      genres: [],
      instagram: '',
      twitter: '',
      file: '',
    },
  },
};
