import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal, Button, Input } from 'antd';
import moment from 'moment';
import Column from './column';
import LoaderHOC from '../isLoading';
import Api from '../../services/api';
import { ReactComponent as Avatar } from '../../assets/icons/avatar.svg';
import { ReactComponent as Like } from '../../assets/icons/like.svg';
import { ReactComponent as Unlike } from '../../assets/icons/unlike.svg';
import BookshelfLikes from '../modals/bookshelf-likes';
import { Header2 } from '../../styled-components/header';

const ReactDnDArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
  p {
    margin: 0;
  }
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CommentsWrapper = styled.div`
  margin-top: 3rem;
`;

const CommentDetail = styled.div`
  display: inline-block;
  width: 600px;
`;

const UserComments = styled.div`
  margin-top: 3rem;
`;

const AvatarStyle = styled(Avatar)`
  width: 50px;
  margin-right: 1rem;
  float: left;
`;
const AvatarWrapper = styled.div`
  height: 50px !important;
  width: 50px !important;
  margin-right: 2rem !important;
  border-radius: 50%;
  overflow: hidden;
  background-image: ${props => (props.img ? `url(${props.img})` : '')};
  background-size: 50px auto;
  background-position: center;
  background-repeat: no-repeat;
  float: left;
`;
const FormStyle = styled.form`
  width: 300px;
`;

const CommentWrapper = styled.div`
  margin-bottom: 1rem;
`;

const svgStyle = {
  height: '20px',
  width: 'auto',
};

const btnStyle = {
  display: 'inline-block',
  marginBottom: 0,
  fontWeight: 'bold',
  background: 'none',
  border: 'none',
};

const { TextArea } = Input;

class UserList extends React.Component {
  api = new Api().Resolve();

  userId = window.location.pathname.split('/')[3];

  bookshelfId = window.location.pathname.split('/')[5];

  username = window.location.pathname.split('/')[2];

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      isLiked: true,
      likeCount: null,
      likedUsers: [],
      comments: [],
      visible: false,
      errors: '',
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onHandleLike = this.onHandleLike.bind(this);
  }

  componentDidMount() {
    const { loggedInUserId } = this.props;

    const data = {
      books: {},
      columns: {
        backlog: {
          id: 'backlog',
          title: 'BACKLOG',
          bookIds: [],
        },
        completed: {
          id: 'completed',
          title: 'COMPLETED',
          bookIds: [],
        },
        current: {
          id: 'current',
          title: 'CURRENTLY READING',
          bookIds: [],
        },
      },
      columnOrder: ['backlog', 'completed', 'current'],
    };

    Promise.all([
      fetch(`${process.env.REACT_APP_HOSTNAME}/user/list/likes/${loggedInUserId}/${this.bookshelfId}`),
      fetch(`${process.env.REACT_APP_HOSTNAME}/user/bookshelf/${this.bookshelfId}`),
      fetch(`${process.env.REACT_APP_HOSTNAME}/bookshelf/comments/${this.bookshelfId}`)]).then((res) => {
      Promise.all([res[0].json(), res[1].json(), res[2].json()]).then((res2) => {
        const isLiked = res2[0].voted;
        const likeCount = res2[0].count;
        const { likedUsers } = res2[0];
        const books = [...res2[1][0].backlog, ...res2[1][0].currently, ...res2[1][0].completed];
        const booksObj = {};
        const { comments } = res2[2];

        books.map((book, index) => {
          booksObj[`book-${index + 1}`] = {
            id: `book-${index + 1}`,
            content: {
              title: book.title,
              author: book.author,
              cover: book.cover,
              isbn: book.isbn,
              status: book.status,
            },
          };

          if (book.status === 'backlog') {
            data.columns.backlog.bookIds.push(`book-${index + 1}`);
          }

          if (book.status === 'completed') {
            data.columns.completed.bookIds.push(`book-${index + 1}`);
          }

          if (book.status === 'current') {
            data.columns.current.bookIds.push(`book-${index + 1}`);
          }

          return null;
        });

        data.books = {
          ...booksObj,
        };

        this.setState({
          isLiked, likeCount, data, likedUsers, comments,
        });
      });
    });
  }

  onDragEnd(result) {
    let destColumn;
    let destTaskIds;
    let newDestColumn;

    const { destination, source, draggableId } = result;
    const { data } = this.state;
    // Get id of column that item was dragged from
    const column = data.columns[source.droppableId];
    // create a copy of the taskIds array to manipulate
    const newTaskIds = [...column.bookIds];
    // remove item from original position
    newTaskIds.splice(source.index, 1);

    // update the source column array
    const newColumn = {
      id: column.id,
      title: column.title,
      bookIds: newTaskIds,
    };


    if (!destination) return;

    if (
      destination.droppableId === source.droppableId && destination.index === source.index
    ) {
      return;
    }

    /* ***************************************

      BOOK WAS DROPPED IN DIFFERENT COLUMN

    *************************************** */

    if (destination.droppableId !== source.droppableId) {
      // update destination column array
      destColumn = data.columns[destination.droppableId];
      destTaskIds = [...destColumn.bookIds];

      destTaskIds.splice(destination.index, 0, draggableId);
      newDestColumn = {
        id: destColumn.id,
        title: destColumn.title,
        bookIds: destTaskIds,
      };

      const state = { ...data };

      state.columns = {
        ...data.columns,
        [newColumn.id]: newColumn,
        [destColumn.id]: newDestColumn,
      };

      state.books[draggableId].content.status = destination.droppableId;
      this.setState({
        data: { ...state },
      }, async () => {
        const newState = this.state;
        const backlog = newState.data.columns.backlog.bookIds.map(id => newState.data.books[id].content);
        const completed = newState.data.columns.completed.bookIds.map(id => newState.data.books[id].content);
        const current = newState.data.columns.current.bookIds.map(id => newState.data.books[id].content);

        const bookshelf = await this.api.updateUserBookshelf(this.bookshelfId, { data: [backlog, completed, current] });

        this.setState((prevState) => {
          const state2 = prevState;
          state2.books = [...bookshelf[0].backlog, ...bookshelf[0].currently, ...bookshelf[0].completed];
          state2.columns = [...bookshelf];
          return data;
        });
      });

      return;
    }

    /* ***************************************

      BOOK WAS DROPPED IN SAME COLUMN

    *************************************** */

    // insert moved item into new position if dropped in same column
    newTaskIds.splice(destination.index, 0, draggableId);

    // update state
    data.columns = {
      ...data.columns,
      [newColumn.id]: newColumn,
    };

    this.setState({
      data: { ...data },
    }, async () => {
      const backlog = data.columns.backlog.bookIds.map(id => data.books[id].content);
      const completed = data.columns.completed.bookIds.map(id => data.books[id].content);
      const current = data.columns.current.bookIds.map(id => data.books[id].content);

      const bookshelf = await this.api.updateUserBookshelf(this.bookshelfId, { data: [backlog, completed, current] });

      this.setState((prevState) => {
        const state = prevState;
        state.books = [...bookshelf[0].backlog, ...bookshelf[0].currently, ...bookshelf[0].completed];
        state.columns = [...bookshelf];
        return data;
      });
    });
  }

  onHandleLike() {
    const { isLiked } = this.state;
    const { loggedInUserId } = this.props;

    if (isLiked) {
      this.setState({ isLiked: !isLiked }, async () => {
        // remove record from likes table
        const bookshelfInfo = await this.api.addUserLikeBookshelf({ user_id: loggedInUserId, list_id: this.bookshelfId });
        this.setState({ likeCount: bookshelfInfo.count });
      });

      return;
    }

    this.setState({ isLiked: !isLiked }, () => {
      // add id to likes table
      fetch(`${process.env.REACT_APP_HOSTNAME}/user/update/list/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: loggedInUserId,
          list_id: this.bookshelfId,
        }),
      }).then(res => res.json()).then((data) => {
        this.setState({ likeCount: data.count });
      });
    });
  }

  handleChange = (e) => {
    this.setState({ comment: e.target.value });
  }

  onFormSubmit = async (e) => {
    e.preventDefault();
    const { loggedInUserId, user } = this.props;
    const { comment } = this.state;

    if (!comment) {
      this.setState({ errors: 'You must enter a comment' });
      return;
    }

    const data = {
      comment,
      user_id: loggedInUserId,
      list_id: this.bookshelfId,
    };

    this.setState((prevState) => {
      const state = prevState;
      state.comment = '';

      // push comment
      const userComment = {
        avatar_url: user.avatar_url,
        username: user.username,
        created_at: moment().toDate(),
        comment,
      };

      state.comments.push(userComment);
      state.errors = '';
      return state;
    });
    await this.api.submitBookshelfComment(data);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      data,
      likeCount,
      isLiked,
      likedUsers,
      comments,
      comment,
      visible,
      errors,
    } = this.state;

    const { loggedInUserId } = this.props;
    const displayLikeBtn = parseInt(likeCount, 10) ? <button type="button" onClick={this.showModal} style={btnStyle}>{likeCount}</button> : '';

    if (!data) return null;

    return (
      <div className="animated fadeIn">
        <Header2>
          <Link to={`/user/${this.username}/${this.userId}`}>
            {this.username}
            &apos;s
          </Link>
          &nbsp;
          Bookshelf
        </Header2>
        <TopWrapper>
          <LikeWrapper>
            {!isLiked ? <Unlike onClick={this.onHandleLike} style={svgStyle} /> : <Like onClick={this.onHandleLike} style={svgStyle} />}
            {displayLikeBtn}
          </LikeWrapper>
        </TopWrapper>
        <ReactDnDArea>
          <DragDropContext
            // onDragStart
            // onDragupdate
            onDragEnd={this.onDragEnd}
          >
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const booksArr = column.bookIds.map(bookId => data.books[bookId]);

              return <Column key={column.id} column={column} books={booksArr} />;
            })}
          </DragDropContext>
        </ReactDnDArea>
        <CommentsWrapper>
          <Header2>Leave a comment</Header2>
          <FormStyle onSubmit={this.onFormSubmit}>
            <TextArea rows={4} onChange={this.handleChange} value={comment} />
            <Button style={{ marginRight: '1rem' }} onClick={this.onFormSubmit}>Send</Button>
            <span style={{ color: 'red' }}>{errors}</span>
          </FormStyle>
          <UserComments>
            <p style={{ fontWeight: 'bold' }}>
              Comments (
              {comments.length}
              )
            </p>
            {comments.map((userComment) => {
              let link;

              if (loggedInUserId === userComment.user_id) {
                link = <Link to="/me">{userComment.username}</Link>;
              } else {
                link = <Link to={`/user/${userComment.username}/${userComment.id}`}>{userComment.username}</Link>;
              }
              return (
                <CommentWrapper key={userComment.comment}>
                  {userComment.avatar_url
                    ? (
                      <AvatarWrapper img={userComment.avatar_url} />
                    )
                    : <AvatarStyle />}
                  <CommentDetail>
                    {link}
                    &nbsp;
                    <small>{moment(userComment.created_at).fromNow()}</small>
                    <p>{userComment.comment}</p>
                  </CommentDetail>
                </CommentWrapper>
              );
            })}
          </UserComments>
        </CommentsWrapper>
        <Modal
          title="Likes"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <BookshelfLikes users={likedUsers} loggedInUserId={loggedInUserId} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.getUser,
    loggedInUserId: state.getUser.id,
    loggedInUserListId: state.loggedInUserListId,
  };
}

// export default connect(mapStateToProps, null)(LoaderHOC('loggedInUserId')(UserList));


export default connect(mapStateToProps, null)(LoaderHOC('loggedInUserId')(UserList));


UserList.propTypes = {
  loggedInUserId: PropTypes.number.isRequired,
  error: PropTypes.shape({}),
  user: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

UserList.defaultProps = {
  error: null,
};
