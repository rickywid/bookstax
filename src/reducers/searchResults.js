export default (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_RESULTS':
      return [action.payload.results.items];
    default:
      return state;
  }
};
