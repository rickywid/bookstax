export const getUserProfile = () => (dispatch) => {
  fetch('http://localhost:3001/user/1', {
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Credentials': true,
    },
  }).then(res => res.json()).then((data) => {
    // set user profile to global application state
    dispatch({
      type: 'GET_USER',
      payload: data[0],
    });
  });
};


export const userAuth = () => (dispatch) => {
  dispatch({
    type: 'IS_AUTH',
    payload: true,
  });
};


export const googleSignIn = history => (
  (dispatch) => {
    dispatch({
      type: 'IS_AUTH',
      payload: true,
    });

    history.push('/dashboard');
  }
);
