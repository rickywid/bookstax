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

export const searchResults = (data, history) => (dispatch) => {
  const query = data.split(' ').join('+');

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}?printType=books&maxResults=40`).then(res => res.json()).then((json) => {
    dispatch({
      type: 'SEARCH_RESULTS',
      payload: {
        results: json,
      },
    });

    history.push('/search');
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
