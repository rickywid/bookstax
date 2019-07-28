import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { Badge, Modal } from 'antd';
import BookItem from './bookItem';

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
    };
  }

  showModal = (id) => {
    this.setState({
      visible: true,
      selectedBook: id,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, selectedBook } = this.state;
    const { column, books } = this.props;
    const modalBook = books[selectedBook];

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
              {books.map((book, index) => <div role="button" tabIndex="0" onClick={this.showModal.bind(this, index)} onKeyDown={this.showModal.bind(this, index)}><BookItem key={book.id} book={book} index={index} /></div>)}
              {provided.placeholder}
            </BookList>
          )}
        </Droppable>
        <Modal
          title=""
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <img src={modalBook ? modalBook.content.cover : ''} alt="book cover" />
          <p>{modalBook ? modalBook.content.title : '' }</p>
          <p>{modalBook ? modalBook.content.author : '' }</p>
        </Modal>
      </Container>
    );
  }
}

Column.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.shape({
      cover: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  column: PropTypes.shape({ title: PropTypes.string, id: PropTypes.string }).isRequired,
};

export default Column;
