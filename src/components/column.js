import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Task from './task';

const Container = styled.div`
  min-height: 300px;
  border: 1px dashed grey;
  padding: 10px;
  flex: 1;
`;
const Title = styled.h3``;
const TaskList = styled.div``;

class Column extends React.Component {
  render() {
    const { column, tasks } = this.props;
    return (
      <Container>
        <Title>{column.title}</Title>
        <Droppable droppableId={column.id}>
          {provided => (
            <TaskList
              ref={provided.innerRef}
              // innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}

Column.propTypes = {
  tasks: PropTypes.arrayOf.isRequired,
  column: PropTypes.shape({ title: PropTypes.string, id: PropTypes.number }).isRequired,
};

export default Column;
