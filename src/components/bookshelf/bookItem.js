import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  background: #fff;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
`;

class BookItem extends React.Component {
  render() {
    const { book, index } = this.props;
    const isDraggable = window.location.pathname.indexOf('me-list') < 1;

    return (
      <div>
        <Draggable isDragDisabled={isDraggable} draggableId={book.id} index={index}>
          {provided => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <p style={{ margin: 0 }}>{book.content.title}</p>
            </Container>
          )}
        </Draggable>
      </div>
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
