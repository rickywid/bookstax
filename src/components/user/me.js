import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { Modal } from 'antd';
import Api from '../../services/api';
import LoaderHOC from '../isLoading';
import CurrentlyReading from './currently-reading';
import { ReactComponent as Medal } from '../../assets/icons/medal.svg';

const Wrapper = styled.div`
  display: flex;
`;
const UserInfo = styled.div``;
const UserDetails = styled.div``;

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

    this.setState((prevState) => {
      const state = prevState;
      state.user = user;
      state.user.bookshelf = userList;

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
    const { list } = this.state;
    const book = list.user.bookshelf[0].currently.splice(index, 1);
    book[0].status = 'completed';
    const { backlog } = list.user.bookshelf[0].backlog;
    const current = list.user.bookshelf[0].currently;
    const completed = [book[0], ...list.completed];

    await this.api.updateUserBookshelf(this.bookshelfId, { data: [backlog, completed, current] });
    this.setState({ displayCongratssModal: true });
  }

  render() {
    const { user, displayCongratssModal } = this.state;
    if (Object.keys(user).length === 0 && user.constructor === Object) return <div />;

    return (
      <Wrapper>
        <UserInfo>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>
            Joined
            { moment(user.created_at).fromNow()}
          </p>
          <button type="button">Send e-mail</button>
        </UserInfo>
        <UserDetails>
          <h4>Currently Reading</h4>
          {user.bookshelf[0].currently.map((book, index) => <CurrentlyReading key={book.isbn} index={index} book={book} markBookCompleted={this.markBookCompleted} />)}
        </UserDetails>
        <Link to="/me-list">Bookshelf</Link>
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
    name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    list_id: PropTypes.number.isRequired,
  }).isRequired,
};
