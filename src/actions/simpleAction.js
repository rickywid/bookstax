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
  const userId = localStorage.getItem('userID') || '';
  const data = await api.getCurrentUserProfile(userId);
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

export const signup = (values, history) => (
  (dispatch) => {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    })
      .then(response => response.json()).then((json) => {
        if (json.errors) {
          // call dispatch to AUTH_ERR reducer
          dispatch({
            type: 'AUTH_ERR',
            payload: json.errors,
          });

          return;
        }
        // save token to local storage
        localStorage.setItem('token', json.token);
        localStorage.setItem('userID', json.id);

        // call dispatch to AUTH_USER reducer
        dispatch({
          type: 'IS_AUTH',
          payload: true,
        });

        history.push({ pathname: '/dashboard', state: { fromSignUp: true } });
      });
  }
);

export const signOut = () => (dispatch) => {
  dispatch({
    type: 'SIGNOUT',
    payload: false,
  });

  localStorage.removeItem('token');
  localStorage.removeItem('userID');
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

export const signin = (values, history) => (
  (dispatch) => {
    fetch('http://localhost:3001/signin/local', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: values.login,
        password: values.password,
      }),
    })
      .then(response => response.json()).then((json) => {
        // save token to local storage
        localStorage.setItem('token', json.token);
        localStorage.setItem('userID', json.id);

        // call dispatch to AUTH_USER reducer
        dispatch({
          type: 'IS_AUTH',
          payload: true,
        });

        history.push({ pathname: '/dashboard', state: { fromSignUp: true } });
      }).catch((err) => {
        console.log(err);

        // dispatch({
        //   type: 'AUTH_ERR',
        //   payload: 'Email or password is incorrect',
        // });
      });
  }
);
export const googleSignIn = history => (
  (dispatch) => {
    dispatch({
      type: 'IS_AUTH',
      payload: true,
    });

    history.push('/dashboard');
  }
);
