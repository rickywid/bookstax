import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from '../column';

const ReactDnDArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLiked: true };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    const bookshelfId = window.location.pathname.split('/')[4];
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

    Promise.all([fetch('http://localhost:3001/user/list/likes'), fetch(`http://localhost:3001/user/bookshelf/${bookshelfId}`)]).then((res) => {
      Promise.all([res[0].json(), res[1].json()]).then((res2) => {
        const isLiked = res2[0];
        const books = [...res2[1][0].backlog, ...res2[1][0].currently, ...res2[1][0].completed];
        const booksObj = {};

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

        this.setState({ isLiked, data });
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

    // if item was dropped into a different column
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
      }, () => {
        const newState = this.state;
        const backlog = newState.data.columns.backlog.bookIds.map(id => newState.data.books[id].content);
        const completed = newState.data.columns.completed.bookIds.map(id => newState.data.books[id].content);
        const current = newState.data.columns.current.bookIds.map(id => newState.data.books[id].content);

        fetch('http://localhost:3001/user/update/books/1', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: [backlog, completed, current] }),
        }).then(res => res.json()).then((json) => {
          this.setState((prevState) => {
            const state2 = prevState;
            state2.books = [...json[0].backlog, ...json[0].currently, ...json[0].completed];
            state2.columns = [...json];
            return data;
          });
        });
      });

      return;
    }

    // insert moved item into new position if dropped in same column
    newTaskIds.splice(destination.index, 0, draggableId);

    // update state
    data.columns = {
      ...data.columns,
      [newColumn.id]: newColumn,
    };

    this.setState({
      data: { ...data },
    }, () => {
      const backlog = data.columns.backlog.bookIds.map(id => data.books[id].content);
      const completed = data.columns.completed.bookIds.map(id => data.books[id].content);
      const current = data.columns.current.bookIds.map(id => data.books[id].content);

      fetch('http://localhost:3001/user/update/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [backlog, completed, current] }),
      }).then(res => res.json()).then((json) => {
        this.setState((prevState) => {
          const state = prevState;
          state.books = [...json[0].backlog, ...json[0].currently, ...json[0].completed];
          state.columns = [...json];
          return data;
        });
      });
    });
  }

  onHandleLike() {
    const { isLiked } = this.state;

    if (isLiked) {
      this.setState({ isLiked: !isLiked }, () => {
        // remove record from likes table
        fetch('http://localhost:3001/user/update/list/likes', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: 1,
            list_id: 1,
          }),
        });
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
          user_id: 1,
          list_id: 1,
        }),
      });
    });
  }

  render() {
    const {
      data,
      isLiked,
    } = this.state;
    if (!data) return null;

    return (
      <ReactDnDArea>
        <button type="button" onClick={this.onHandleLike.bind(this)}>{!isLiked ? 'Like' : 'Unlike'}</button>
        <DragDropContext
          // onDragStart
          // onDragupdate
          onDragEnd={this.onDragEnd}
        >
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasksArr = column.bookIds.map(bookId => data.books[bookId]);

            return <Column key={column.id} column={column} tasks={tasksArr} />;
          })}
        </DragDropContext>
      </ReactDnDArea>
    );
  }
}

export default UserList;
