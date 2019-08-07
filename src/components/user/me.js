import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { Modal, Button } from 'antd';
import Api from '../../services/api';
import LoaderHOC from '../isLoading';
import CurrentlyReading from './currently-reading';
import { ReactComponent as Medal } from '../../assets/icons/medal.svg';
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

class Me extends React.Component {
  api = new Api().Resolve();

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      displayCongratssModal: false,
    };

    this.markBookCompleted = this.markBookCompleted.bind(this);
  }

  async componentDidMount() {
    const { user } = this.props;

    const data = await fetch(`http://localhost:3001/user/bookshelf/${user.list_id}`);
    const userList = await data.json();

    const data2 = await fetch(`http://localhost:3001/favourites/${user.id}`);
    const userFavourites = await data2.json();

    this.setState((prevState) => {
      const state = prevState;
      state.user = user;
      state.user.bookshelf = userList;
      state.user.favourites = userFavourites;

      return state;
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

  renderCurrentBooks() {
    const { user } = this.state;

    if (user.bookshelf[0].currently.length) {
      return user.bookshelf[0].currently.map((book, index) => <CurrentlyReading key={book.isbn} index={index} book={book} markBookCompleted={this.markBookCompleted} />);
    }

    return <div>you&apos;re not reading any books at the moment</div>;
  }

  render() {
    const { user, displayCongratssModal } = this.state;

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
                    <Stat>{user.bookshelf[0].backlog.length}</Stat>
                    <p>Backlog</p>
                  </li>
                  <li>
                    <Stat>{user.bookshelf[0].currently.length}</Stat>
                    <p>Current</p>
                  </li>
                  <li>
                    <Stat>{user.bookshelf[0].completed.length}</Stat>
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
          <p>favourites</p>
          {user.favourites.map(book => <div key={book.bookId}><Link to={`/book/${book.bookId}`}><img src={book.cover} alt="" /></Link></div>)}
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

export default connect(mapStateToProps, null)(LoaderHOC('user')(Me));

Me.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    list_id: PropTypes.number.isRequired,
  }).isRequired,
};
