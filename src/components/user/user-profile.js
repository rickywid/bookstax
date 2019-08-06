import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import Api from '../../services/api';
import LoaderHOC from '../isLoading';
import CurrentlyReading from './currently-reading';

const Wrapper = styled.div`
  display: flex;
`;
const UserInfo = styled.div``;
const UserDetails = styled.div``;

class Me extends React.Component {
  api = new Api().Resolve();

  userId = window.location.pathname.split('/')[2];

  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  async componentDidMount() {
    const data = await fetch(`http://localhost:3001/user/bookshelf/${this.userId}`);
    const userList = await data.json();

    this.setState((prevState) => {
      const { user } = this.props;
      const state = prevState;
      state.user = user;
      state.user.bookshelf = userList;

      return state;
    });
  }

  render() {
    const { user } = this.state;
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
          {user.bookshelf[0].currently.map(book => <CurrentlyReading key={book.isbn} book={book} />)}
        </UserDetails>
        <Link to="/me-list">Bookshelf</Link>
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
  }).isRequired,
};
