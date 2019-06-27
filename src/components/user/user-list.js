import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from '../column';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialData;
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    let destColumn;
    let destTaskIds;
    let newDestColumn;

    const { destination, source, draggableId } = result;
    const { columns } = this.state;

    // Get id of column that item was dragged from
    const column = columns[source.droppableId];
    // create a copy of the taskIds array to manipulate
    const newTaskIds = [...column.taskIds];
    // remove item from original position
    newTaskIds.splice(source.index, 1);

    // update the source column array
    const newColumn = {
      id: column.id,
      title: column.title,
      taskIds: newTaskIds,
    };


    if (!destination) return;

    if (
      destination.droppableId === source.droppableId && destination.index === source.index
    ) {
      return;
    }

    // if item was dropped into a different column
    if (destination.droppableId !== source.droppableId) {
      // update column the destination column array
      destColumn = columns[destination.droppableId];
      destTaskIds = [...destColumn.taskIds];

      destTaskIds.splice(destination.index, 0, draggableId);
      newDestColumn = {
        id: destColumn.id,
        title: destColumn.title,
        taskIds: destTaskIds,
      };

      // update state
      this.setState(prevState => ({
        ...prevState,
        columns: {
          ...prevState.columns,
          [newColumn.id]: newColumn,
          [destColumn.id]: newDestColumn,
        },
      }));
      return;
    }

    // insert moved item into new position if dropped in same column
    newTaskIds.splice(destination.index, 0, draggableId);

    // update state
    this.setState(prevState => ({
      ...prevState,
      columns: {
        ...prevState.columns,
        [newColumn.id]: newColumn,
      },
    }));
  }

  render() {
    const { columnOrder, columns, tasks } = this.state;
    return (
      <DragDropContext
        // onDragStart
        // onDragupdate
        onDragEnd={this.onDragEnd}
      >
        {columnOrder.map((columnId) => {
          const column = columns[columnId];
          const tasksArr = column.taskIds.map(taskId => tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasksArr} />;
        })}
      </DragDropContext>
    );
  }
}

export default UserList;
