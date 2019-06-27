import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`

`;

class Task extends React.Component {
  render() {
    const { task, index } = this.props;

    return (
      <Draggable draggableId={task.id} index={index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            // innerRef={provided.innerRef}
          >
            {task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({ id: PropTypes.number, content: PropTypes.string }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Task;

// https://github.com/atlassian/react-beautiful-dnd/issues/875
