export default (state = { authenticated: false }, action) => {
  switch (action.type) {
    case 'IS_AUTH':
      return { ...state, authenticated: action.payload };
    case 'AUTH_ERR':
      return {
        ...state,
        errors: action.payload,
      };
    case 'SIGNOUT':
      return { ...state, authenticated: action.payload };
    default:
      return state;
  }
};
