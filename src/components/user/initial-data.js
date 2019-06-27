const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Take out the garbage',
    },
    'task-2': {
      id: 'task-2',
      content: 'Take out the dog',
    },
    'task-3': {
      id: 'task-3',
      content: 'Take out the car',
    },
    'task-4': {
      id: 'task-4',
      content: 'Take out the girl',
    },
    'task-5': {
      id: 'task-5',
      content: 'Take out the dinner',
    },
    'task-6': {
      id: 'task-6',
      content: 'Take out the whatever',
    },
    'task-7': {
      id: 'task-7',
      content: 'Take out the ho',
    },
  },
  columns: {
    backlog: {
      id: 'backlog',
      title: 'Backlog',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
    },
    completed: {
      id: 'completed',
      title: 'Completed',
      taskIds: ['task-6'],
    },
    current: {
      id: 'current',
      title: 'Currently Reading',
      taskIds: ['task-7'],
    },
  },
  columnOrder: ['backlog', 'completed', 'current'],
};

export default initialData;
