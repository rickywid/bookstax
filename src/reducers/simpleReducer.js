export default (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      console.log('simple');
      return {
        result: action.payload,
      };
    default:
      return state;
  }
};
