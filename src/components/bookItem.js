import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`

`;

class BookItem extends React.Component {
  render() {
    const { book, index } = this.props;
    return (
      <Draggable draggableId={book.id} index={index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            // innerRef={provided.innerRef}
          >
            <img src={book.content.cover} alt="cover" />
            <p>{book.content.title}</p>
            <p>{book.content.author}</p>
          </Container>
        )}
      </Draggable>
    );
  }
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.shape({
      cover: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default BookItem;

// https://github.com/atlassian/react-beautiful-dnd/issues/875
