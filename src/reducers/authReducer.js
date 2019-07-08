export default (state = { authenticated: false }, action) => {
  switch (action.type) {
    case 'IS_AUTH':
      console.log('asdf');
      return { ...state, authenticated: action.payload };
    default:
      return state;
  }
};
