export default (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_RESULTS':
      return [...state, action.payload.results.items];
    default:
      return state;
  }
};
