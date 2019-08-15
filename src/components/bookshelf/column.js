import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { Badge, Modal, Button } from 'antd';
import { connect } from 'react-redux';
import BookItem from './bookItem';
import BookshelfBookItem from '../modals/bookshelf-book';

const Container = styled.div`
  min-height: 300px;
  padding: 10px;
  width: 32%;
  background: #f5f5f5;

  &:nth-child(1) {
    border-top: 5px solid pink;
  }
  &:nth-child(2) {
    border-top: 5px solid orange;
  }
  &:nth-child(3) {
    border-top: 5px solid green;
  }
`;
const Title = styled.h3`
  font-weight: bold;
`;
const BookList = styled.div`
  min-height: 300px;
`;

const badgeStyle = {
  backgroundColor: '#bcdaff',
  color: '#3f7ccc',
  fontWeight: 'bold',
  marginLeft: '10px',
};

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedBook: null,
      isCompletedColumn: false,
      isDeleting: false,
      favourites: [],
    };
  }

  componentDidMount() {
    const { favourites } = this.props;
    this.setState({ favourites: favourites || [] });
  }

  showModal = (id, column) => {
    this.setState({
      visible: true,
      selectedBook: id,
      isCompletedColumn: column.title === 'Completed',
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleDelete = () => {
    const { deleteBook, index, books } = this.props;
    deleteBook(index, books[0].id);
    this.setState({ visible: false });
  }

  updateFavourite = (book, action) => {
    const { favourites } = this.state;
    const { id, userId } = this.props;
    let data;

    if (action === 'add') {
      let books = favourites;
      books = [...books, book];

      data = {
        id,
        book: JSON.stringify(books),
      };
    } else {
      const bookId = book.bookId; /* eslint-disable-line */
      const books = favourites.filter(item => item.bookId !== bookId);

      data = {
        id,
        book: JSON.stringify(books),
      };
    }

    fetch(`http://localhost:3001/favourites/add/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json()).then(res2 => this.setState({ favourites: res2.books }));
  }

  checkIsFavourite(book) {
    if (!Object.keys(book).length) return;

    const { favourites } = this.state;
    const id = book.content.bookId;
    const match = favourites.filter(item => item.bookId === id);

    if (match.length) {
      return <Button key="favourite" type="primary" onClick={() => this.updateFavourite(book.content, 'remove')}>Remove from Favourites</Button>;/* eslint-disable-line */
    }

    return <Button key="favourite" type="primary" onClick={() => this.updateFavourite(book.content, 'add')}>Save to Favourites</Button>;/* eslint-disable-line */
  }

  render() {
    const {
      visible,
      selectedBook,
      isDeleting,
      isCompletedColumn,
    } = this.state;
    const { column, books } = this.props;
    const modalBook = books[selectedBook] || {};

    return (
      <Container>
        <Title>
          {column.title}
          <Badge count={books.length} style={badgeStyle} />
        </Title>
        <Droppable droppableId={column.id}>
          {provided => (
            <BookList
              ref={provided.innerRef}
              // innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              {books.map((book, index) => (
                <div key={book.id} role="button" tabIndex="0" onClick={this.showModal.bind(this, index, column)} onKeyDown={this.showModal.bind(this, index)}>
                  <BookItem key={book.id} book={book} index={index} />
                </div>
              ))}
              {provided.placeholder}
            </BookList>
          )}
        </Droppable>
        <Modal
          width={800}
          closable={false}
          title=""
          visible={visible}
          footer={window.location.pathname.includes('/me') ? [
            <Button key="close" onClick={this.handleOk}>
              Close
            </Button>,
            isCompletedColumn ? this.checkIsFavourite(modalBook) : '',
            <Button key="delete" type="primary" loading={isDeleting} onClick={this.handleDelete}>
              Remove Book
            </Button>,
          ] : [<Button key="close" onClick={this.handleOk}>Close</Button>]}
        >
          <BookshelfBookItem {...modalBook} />
        </Modal>
      </Container>
    );
  }
}

Column.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.shape({
      cover: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      description: PropTypes.string,
      pageCount: PropTypes.number,
      avgRating: PropTypes.number,
    }).isRequired,
  })),
  column: PropTypes.shape({ title: PropTypes.string, id: PropTypes.string }).isRequired,
  deleteBook: PropTypes.func,
  index: PropTypes.number,
  favourites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};

Column.defaultProps = {
  books: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.shape({
      description: '',
      pageCount: '',
      avgRating: '',
    }).isRequired,
  })).isRequired,
  deleteBook: null,
  index: null,
};


function mapStateToProps(state) {
  return {
    userId: state.getUser.id,
    id: state.getUser.favourite_books_id,
  };
}

export default connect(mapStateToProps, null)(Column);
