import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import BookItem from './bookItem';

const Container = styled.div`
  min-height: 300px;
  border: 1px dashed grey;
  padding: 10px;
  flex: 1;
`;
const Title = styled.h3``;
const BookList = styled.div``;

class Column extends React.Component {
  render() {
    const { column, books } = this.props;
    return (
      <Container>
        <Title>{column.title}</Title>
        <Droppable droppableId={column.id}>
          {provided => (
            <BookList
              ref={provided.innerRef}
              // innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              {books.map((book, index) => <BookItem key={book.id} book={book} index={index} />)}
              {provided.placeholder}
            </BookList>
          )}
        </Droppable>
      </Container>
    );
  }
}

Column.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  column: PropTypes.shape({ title: PropTypes.string, id: PropTypes.string }).isRequired,
};

export default Column;
