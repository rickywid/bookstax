export default (state = { authenticated: true }, action) => {
  switch (action.type) {
    case 'IS_AUTH':
      return { ...state, authenticated: action.payload };
    default:
      return state;
  }
};
