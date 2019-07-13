import Api from '../services/api';

const api = new Api().Resolve();

export const getUserProfile = () => (dispatch) => {
  fetch('http://localhost:3001/user/2', {
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

export const getLoggedInUserProfile = () => async (dispatch) => {
  // https://stackoverflow.com/questions/16434893/node-express-passport-req-user-undefined
  const data = await api.getCurrentUserProfile();
  dispatch({
    type: 'CURRENT_USER',
    payload: data[0],
  });
};


export const userAuth = () => (dispatch) => {
  dispatch({
    type: 'IS_AUTH',
    payload: true,
  });
};

export const signOut = () => (dispatch) => {
  dispatch({
    type: 'SIGNOUT',
    payload: false,
  });

  localStorage.removeItem('token');
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
