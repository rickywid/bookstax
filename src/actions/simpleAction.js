import Api from '../services/api';

const api = new Api().Resolve();

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
    fetch(`${process.env.REACT_APP_HOSTNAME}/signup`, {
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

        localStorage.setItem('token', json.token);
        localStorage.setItem('userID', json.id);

        // call dispatch to AUTH_USER reducer
        dispatch({
          type: 'IS_AUTH',
          payload: true,
        });

        history.push({ pathname: '/dashboardhome', state: { fromSignUp: true } });
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
    fetch(`${process.env.REACT_APP_HOSTNAME}/signin/local`, {
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
      .then((response) => {
        if (!response.ok) {
          dispatch({
            type: 'AUTH_ERR',
            payload: ['Incorrect username or email'],
          });
          return;
        }
        return response.json(); {/* eslint-disable-line */}
      }).then((json) => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('userID', json.id);

        dispatch({
          type: 'IS_AUTH',
          payload: true,
        });

        history.push({ pathname: '/home', state: { fromSignUp: true } });
      }).catch((err) => {
        console.log(err);
      });
  }
);

export const googleSignIn = history => (
  (dispatch) => {
    dispatch({
      type: 'IS_AUTH',
      payload: true,
    });

    history.push('/home');
  }
);

export const formErrors = () => (
  (dispatch) => {
    dispatch({
      type: 'AUTH_ERR',
      payload: [],
    });
  }
);
