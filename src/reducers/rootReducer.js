import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import getUser from './getUserReducer';
import auth from './authReducer';

export default combineReducers({
  getUser,
  auth,
  form: formReducer,
});
