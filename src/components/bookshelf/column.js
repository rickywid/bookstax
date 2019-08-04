import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { Badge, Modal, Button } from 'antd';
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
      isDeleting: false,
    };
  }

  showModal = (id) => {
    this.setState({
      visible: true,
      selectedBook: id,
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

  render() {
    const { visible, selectedBook, isDeleting } = this.state;
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
                <div key={book.id} role="button" tabIndex="0" onClick={this.showModal.bind(this, index)} onKeyDown={this.showModal.bind(this, index)}>
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
          footer={[
            <Button key="close" onClick={this.handleOk}>
              Close
            </Button>,
            <Button key="delete" type="primary" loading={isDeleting} onClick={this.handleDelete}>
              Remove Book
            </Button>,
          ]}
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
  deleteBook: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

Column.defaultProps = {
  books: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.shape({
      description: '',
      pageCount: '',
      avgRating: '',
    }).isRequired,
  })).isRequired,
};

export default Column;
