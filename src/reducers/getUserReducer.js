export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER':
      return { ...state, ...action.payload };
    case 'CURRENT_USER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
