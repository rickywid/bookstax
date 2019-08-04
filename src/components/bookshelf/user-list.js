import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import moment from 'moment';
import Column from './column';
import LoaderHOC from '../isLoading';
import Api from '../../services/api';
import { ReactComponent as Like } from '../../assets/icons/like.svg';
import { ReactComponent as Unlike } from '../../assets/icons/unlike.svg';
import BookshelfLikes from '../modals/bookshelf-likes';

const ReactDnDArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const CommentsWrapper = styled.div`
  margin-top: 3rem;
`;

const UserComments = styled.div`
  margin-top: 3rem;
`;

const svgStyle = {
  height: '30px',
  width: 'auto',
  marginRight: '0.5rem',
};

const btnStyle = {
  display: 'inline-block',
  marginBottom: 0,
  fontWeight: 'bold',
  background: 'none',
  border: 'none',
};

class UserList extends React.Component {
  api = new Api().Resolve();

  userId = window.location.pathname.split('/')[2];

  bookshelfId = window.location.pathname.split('/')[4];

  constructor(props) {
    super(props);
    this.state = {
      isLiked: true,
      likeCount: null,
      likedUsers: [],
      comments: [],
      visible: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onHandleLike = this.onHandleLike.bind(this);
  }

  componentDidMount() {
    // const bookshelfId = window.location.pathname.split('/')[4];
    const { loggedInUserId } = this.props;

    const data = {
      books: {},
      columns: {
        backlog: {
          id: 'backlog',
          title: 'Backlog',
          bookIds: [],
        },
        completed: {
          id: 'completed',
          title: 'Completed',
          bookIds: [],
        },
        current: {
          id: 'current',
          title: 'Currently Reading',
          bookIds: [],
        },
      },
      columnOrder: ['backlog', 'completed', 'current'],
    };

    Promise.all([
      fetch(`http://localhost:3001/user/list/likes/${loggedInUserId}/${this.bookshelfId}`),
      fetch(`http://localhost:3001/user/bookshelf/${this.bookshelfId}`),
      fetch(`http://localhost:3001/bookshelf/comments/${this.bookshelfId}`)]).then((res) => {
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
    const listId = window.location.pathname.split('/')[4];

    if (isLiked) {
      this.setState({ isLiked: !isLiked }, async () => {
        // remove record from likes table
        const bookshelfInfo = await this.api.addUserLikeBookshelf({ user_id: loggedInUserId, list_id: this.bookshelfId });
        this.setState({ likeCount: bookshelfInfo.count });
        // fetch('http://localhost:3001/user/update/list/likes', {
        //   method: 'DELETE',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     user_id: loggedInUserId,
        //     list_id: listId,
        //   }),
        // }).then(res => res.json()).then((data) => {
        //   this.setState({ likeCount: data.count });
        // });
      });

      return;
    }

    this.setState({ isLiked: !isLiked }, () => {
      // add id to likes table
      fetch('http://localhost:3001/user/update/list/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: loggedInUserId,
          list_id: listId,
        }),
      }).then(res => res.json()).then((data) => {
        this.setState({ likeCount: data.count });
      });
    });
  }

  onFormSubmit(values) {
    const { loggedInUserId } = this.props;
    const { comment } = values;

    const data = {
      comment,
      user_id: loggedInUserId,
      list_id: this.bookshelfId,
    };

    this.api.submitBookshelfComment(data);
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

  renderField = ({
    input, label, type, meta: { touched, error },
  }) => (
    <div>
      <label>{label}</label> {/* eslint-disable-line */}
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched
          && ((error && <span>{error}</span>))}
      </div>
    </div>
  )

  renderTextArea = ({
    input, label, type, meta: { touched, error },
  }) => (
    <div>
      <label>{label}</label> {/* eslint-disable-line */}
      <div>
        <textarea {...input} placeholder={label} type={type} rows="5" cols="50" />
        {touched
          && ((error && <span>{error}</span>))}
      </div>
    </div>
  )

  render() {
    const {
      data,
      likeCount,
      isLiked,
      likedUsers,
      comments,
      visible,
    } = this.state;

    const { handleSubmit, error, loggedInUserId } = this.props;

    if (!data) return null;

    return (
      <div>
        <LikeWrapper>
          {!isLiked ? <Unlike onClick={this.onHandleLike} style={svgStyle} /> : <Like onClick={this.onHandleLike} style={svgStyle} />}
          <button type="button" onClick={this.showModal} style={btnStyle}>{likeCount}</button>
        </LikeWrapper>
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
          <p style={{ fontWeight: 'bold' }}>
            Comments (
            {comments.length}
            )
          </p>
          <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
            <Field component={this.renderTextArea} name="comment" label="Message" />
            <Button default htmlType="submit">Send</Button>
            {error}
          </form>
          <UserComments>
            {comments.map((comment) => {
              let link;

              if (loggedInUserId === comment.user_id) {
                link = <Link to="/me">{comment.name}</Link>;
              } else {
                link = <Link to={`/user/${comment.id}`}>{comment.name}</Link>;
              }
              return (
                <div key={comment.comment}>
                  {link}
                  <p>{moment(comment.created_at).fromNow()}</p>
                  <p>{comment.comment}</p>
                </div>
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
    loggedInUserId: state.getUser.id,
    loggedInUserListId: state.loggedInUserListId,
  };
}

const validate = (values) => {
  const errors = {};
  if (!values.comment) {
    errors.comment = 'Comment cannot be blank';
  }

  return errors;
};

// export default connect(mapStateToProps, null)(LoaderHOC('loggedInUserId')(UserList));


export default compose(
  reduxForm({
    form: 'comments',
    fields: ['comment'],
    validate,
  }),
  connect(mapStateToProps, null),
)(LoaderHOC('loggedInUserId')(UserList));


UserList.propTypes = {
  loggedInUserId: PropTypes.number.isRequired,
  error: PropTypes.shape({}),
  handleSubmit: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  error: null,
};
