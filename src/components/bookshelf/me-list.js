import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import Column from './column';
import LoaderHOC from '../isLoading';
import Api from '../../services/api';
import { ReactComponent as Like } from '../../assets/icons/like.svg';
import { ReactComponent as Unlike } from '../../assets/icons/unlike.svg';

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

class MeList extends React.Component {
  api = new Api().Resolve();

  bookshelfId = window.location.pathname.split('/')[4];

  constructor(props) {
    super(props);
    this.state = {
      isLiked: true,
      likeCount: null,
      likedUsers: [],
      visible: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onHandleLike = this.onHandleLike.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  componentDidMount() {
    // const bookshelfId = window.location.pathname.split('/')[4];
    const { loggedInUserId, loggedInUserListId } = this.props;

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


    Promise.all([fetch(`http://localhost:3001/user/list/likes/${loggedInUserId}/${loggedInUserListId}`), fetch(`http://localhost:3001/user/bookshelf/${loggedInUserListId}`)]).then((res) => {
      Promise.all([res[0].json(), res[1].json()]).then((res2) => {
        const isLiked = res2[0].voted;
        const likeCount = res2[0].count;
        const { likedUsers } = res2[0];
        const books = [...res2[1][0].backlog, ...res2[1][0].completed, ...res2[1][0].currently];
        const booksObj = {};

        books.map((book, index) => {
          booksObj[`book-${index + 1}`] = {
            id: `book-${index + 1}`,
            content: {
              title: book.title,
              author: book.author,
              cover: book.cover,
              description: book.description,
              avgRating: book.avgRating,
              pageCount: book.pageCount,
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
          isLiked, likeCount, data, likedUsers,
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
    const { loggedInUserId, loggedInUserListId } = this.props;

    if (isLiked) {
      this.setState({ isLiked: !isLiked }, async () => {
        // remove record from likes table
        const bookshelfInfo = await this.api.addUserLikeBookshelf({ user_id: loggedInUserId, list_id: loggedInUserListId });
        this.setState({ likeCount: bookshelfInfo.count });
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
          list_id: loggedInUserListId,
        }),
      }).then(res => res.json()).then((data) => {
        this.setState({ likeCount: data.count });
      });
    });
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

  deleteBook(id, bookId) {
    this.setState(async (prevState) => {
      const state = prevState;
      const backlogIds = [];
      const completedIds = [];
      const currentIds = [];

      const booksObj = {};

      delete state.data.books[bookId];

      const keys = Object.keys(state.data.books); // book-1, book-2 etc...
      keys.map((key, index) => {
        booksObj[`book-${index + 1}`] = {
          id: `book-${index + 1}`,
          content: state.data.books[key].content,
        };
        // console.log(booksObj)
        if (state.data.books[key].content.status === 'backlog') {
          backlogIds.push(`book-${index + 1}`);
        }

        if (state.data.books[key].content.status === 'completed') {
          completedIds.push(`book-${index + 1}`);
        }

        if (state.data.books[key].content.status === 'current') {
          currentIds.push(`book-${index + 1}`);
        }

        return null;
      });

      state.data.columns.backlog.bookIds = backlogIds;
      state.data.columns.current.bookIds = currentIds;
      state.data.columns.completed.bookIds = completedIds;
      state.data.books = booksObj;

      const backlog = state.data.columns.backlog.bookIds.map(book => state.data.books[book].content);
      const current = state.data.columns.completed.bookIds.map(book => state.data.books[book].content);
      const completed = state.data.columns.current.bookIds.map(book => state.data.books[book].content);

      this.api.updateUserBookshelf(this.bookshelfId, { data: [backlog, completed, current] });

      return state;
    });
  }

  render() {
    const {
      data,
      likeCount,
      isLiked,
      likedUsers,
      visible,
    } = this.state;

    const { loggedInUserId } = this.props;

    if (!data) return null;

    return (
      <div>
        <LikeWrapper>
          {!isLiked ? <Unlike onClick={this.onHandleLike} style={svgStyle} /> : <Like onClick={this.onHandleLike} style={svgStyle} />}
          <button type='button' onClick={this.showModal} style={btnStyle}>{likeCount}</button>
        </LikeWrapper>
        <ReactDnDArea>
          <DragDropContext
            // onDragStart
            // onDragupdate
            onDragEnd={this.onDragEnd}
          >
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const booksArr = column.bookIds.map(bookId => data.books[bookId]);
              return <Column key={column.id} column={column} index={index} deleteBook={this.deleteBook} books={booksArr} />;
            })}
          </DragDropContext>
        </ReactDnDArea>
        <Modal
          title=''
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          liked users
          <ul>
            {likedUsers.map((user) => {
              if (user.id === loggedInUserId) {
                /* eslint jsx-quotes: ["error", "prefer-single"] */
                return <li key={user.name}><Link to='/me'>{user.name}</Link></li>;
              }

              return <li key={user.name}><Link to={`/user/${user.id}`}>{user.name}</Link></li>;
            })}
          </ul>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUserId: state.getUser.id,
    loggedInUserListId: state.getUser.list_id,
  };
}

export default connect(mapStateToProps, null)(LoaderHOC('loggedInUserId')(MeList));


MeList.propTypes = {
  loggedInUserId: PropTypes.number.isRequired,
  loggedInUserListId: PropTypes.number.isRequired,
};
