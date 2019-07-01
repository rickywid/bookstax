const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: {
        title: '1984',
        cover: 'http://books.google.com/books/content?id=dKiJDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        author: 'Fyodor Dostoyevsky',
        isbn: '9781605205106',
      },
    },
    'task-2': {
      id: 'task-2',
      content: {
        title: 'Crime and Punishment',
        cover: 'https://books.google.com/books/content?id=0HZrq-4zA5QC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        author: 'Fyodor Dostoyevsky',
        isbn: '9781605205106',
      },
    },
    'task-3': {
      id: 'task-3',
      content: {
        title: 'Harry Potter',
        cover: 'http://books.google.com/books/content?id=5MQFrgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
        author: 'Fyodor Dostoyevsky',
        isbn: '9781605205106',
      },
    },
    'task-4': {
      id: 'task-4',
      content: {
        title: 'Lord of the Rings',
        cover: 'http://books.google.com/books/content?id=4KwCoQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
        author: 'Fyodor Dostoyevsky',
        isbn: '9781605205106',
      },
    },
    'task-5': {
      id: 'task-5',
      content: {
        title: 'The Hobbit',
        cover: 'http://books.google.com/books/content?id=hFfhrCWiLSMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        author: 'Fyodor Dostoyevsky',
        isbn: '9781605205106',
      },
    },
    'task-6': {
      id: 'task-6',
      content: {
        title: 'Animal Farm',
        cover: 'http://books.google.com/books/content?id=o6eSDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        author: 'Fyodor Dostoyevsky',
        isbn: '9781605205106',
      },
    },
    'task-7': {
      id: 'task-7',
      content: {
        title: 'Da Vinci Code',
        cover: 'http://books.google.com/books/content?id=ohZ1wcYifLsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        author: 'Fyodor Dostoyevsky',
        isbn: '9781605205106',
      },
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
