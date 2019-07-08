export default (state = {
  created_at: '2019-06-29T04:00:00.000Z',
  description: 'I enjoy reading all genres.',
  id: 1,
  list_id: 1,
  name: 'Homer',
}, action) => {
  switch (action.type) {
    case 'GET_USER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
